
## Building My Own Cloud Thermostat

#### Project Inspiration

The site you're visiting right now started out as a simple Arduino project roughly a year and a half ago; when I moved into a new apartment after finishing school, the only way I could heat my room was with a small plug-in unit. Not trusting the built-in thermostat on the device itself (wanting to introduce my own implementation of [hysteresis](https://en.wikipedia.org/wiki/Hysteresis) by controlling it from a temperature measurement point farther away in the room), I initially drew inspiration from [George Dewar](https://georgedewar.wordpress.com/2015/07/27/using-pid-on-an-arduino-to-control-an-electric-heater/) and decided to create my own thermostat.

#### First take

Initially, my parts list was:

* Arduino Uno
* DHT22
* Generic 433Mhz RF RX/TX pair
* 433Mhz RF controlled outlet (Etekcity) 

You can find the Arduino code that this project uses at [this repo](https://github.com/connorbenton/espthermostat) - I started using Git long after the the Arduino side of this project was finished, but I've tried to clean it up and comment it out to show where it began and how it grew over time. I used a 433Mhz link as opposed to an inline relay solution (like a Sonoff) due to wanting the temperature measurement far away from the heat source in the room, as mentioned above. After identifying the transmit codes which triggered the outlet (with the 433Mhz receiver and the included outlet remote), the transmitter was set up to cycle the outlet, and thus the heater, on and off corresponding to the duty cycle indicated by a [PI control](https://en.wikipedia.org/wiki/PID_controller). This control took inputs from the DHT22, and acted over a window of 15 minutes (now lengthened to 30). At this stage, the setup already did a good job of keeping the room at a comfortable temperature during the night, but I wondered just how well it was working. 

<figure align="center" style="padding:10px 0 20px 0">
  <img src="/Images/rf.jpg" style="width:100%;max-width:400px;margin:1em 0 1em 0;">
  <figcaption class="figure-caption text-center">Original plug-in heater unit, controlled by an RF outlet - unfortunately, the Etekcity outlets I used didn't have a good enough relay to use the 'high'/1500W setting on the unit, which would fry them after a couple hours</figcaption>
</figure>

#### Getting Online

My next two goals were to provide a method to toggle the thermostat *off/auto/on* similar to most modern units, and to display the temperature (and PI output) over the most recent five minutes. Even though the 433 Mhz link enabled me to keep the system sitting next to my computer, I also desired a solution where I didn't require a wired connection and/or an always-on system to act as a middleman providing control and data storage. Conceptually, I preferred the decentralized idea of having the thermostat functioning independently within my home network without a middleman like a Pi, prioritizing the ability to deploy this system in other places and to other people (friends, family) without any extras or configuration needed beyond changing a couple WiFi settings and AWS variables (more on that later). I also didn't particularly care to keep this system local, as I wanted to eventually enable control and monitoring from anywhere, and in the event of Internet or power outages preferred to revert to non-mains electricity failsafes (I live in coastal California now, but grew up in Minnesota where it's a decidedly risky choice to omit a [mechanical thermostat](https://en.wikipedia.org/wiki/Bimetallic_strip#Thermostats) from a gas heating system, unless you enjoy the idea of frozen pipes bursting and flooding your house in -20&deg;F weather). 

<figure align="center" style="padding:10px 0 20px 0">
  <img src="/Images/therm.jpg" style="width:100%;max-width:400px;margin:1em 0 1em 0;">
  <figcaption class="figure-caption text-center">Bimetallic thermostat connected to a gas heater, onto which I've spliced a parallel circuit running out to my thermostat (more on this in a bit)</figcaption>
</figure>

Instead of using an existing service for direct Internet/microcontroller IoT connections - Blynk, Cayenne, etc - and accepting all the limitations and dependencies that come hand in hand with them (not to trash them at all, they're fantastic solutions for prototyping), I decided to build my own system, and after a bit of research settled on a AWS based solution. 

#### DynamoDB and ESP8266

The easiest (and cheapest) way on AWS to store the data I had in mind was DynamoDB - see [Tony DiCola's Cloud Thermometer project](https://learn.adafruit.com/cloud-thermometer/overview#why-dynamodb) for a more in-depth justification of the choice. The aforementioned project, not to mention the [extensive](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html) [Amazon](https://sdk.amazonaws.com/cpp/api/LATEST/class_aws_1_1_dynamo_d_b_1_1_dynamo_d_b_client.html) [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property) were great starting points for what I was trying to do, which was to serve a website to both:

* Change the state of a single item DynamoDB table to correspond to *off/auto/on*, which the controller would periodically poll to determine its state
* Read the most recent data from the controller, which would be appending the newest data every 20 seconds to another DynamoDB table

The controller I settled on for receiving and sending data directly to DynamoDB was an ESP8266, which already was fully compatible with my existing controller code via the [Arduino core](https://github.com/esp8266/Arduino) for the system, and which many have noted is remarkably powerful given its cost. I specifically used a NodeMCU development board, but in the future would love to explore creating a custom board for the ESP8266 if I ever get to the point where I think I won't change the circuit design any further (maybe I'll leave that until I migrate this project to an ESP32 some day).

With the help of the [aws-sdk-esp8266](https://github.com/daniele-salvagni/aws-sdk-esp8266) library, I initially stored the temperature, then eventually the humidity, PID output (0-100% of the current window spent turned on), and current heater state in a DynamoDB 'data' table. Shortly after that was up and working, I added a request in the controller code to a second, single-item 'settings' table that stored the heater state, which evaluated the current desired thermostat state in that table as 0 (off), 1 (auto), or 2 (on). Eventually, I'd like to switch to a purely C++/HTTP based interface with AWS (as in the Cloud Thermometer project), as I believe it'd be better for the stability of the ESP8266 program, but I need to do some more research on that front.

#### Displaying the Data

Considering my constraints for the system I had in mind, I wanted a small static site that could pull my controller data from (and push settings to) DynamoDB using Javascript, which is well supported in the AWS environment. I started by using a simple Chart.js line graph which would first load the last 15 points (5 minutes) of data, and then live update as it queried for new data every ~10 seconds, as well as a 3-way button that would rewrite the single-item table value for state to 0, 1, or 2. This static site was easy to host on a S3 bucket, which is one of the easiest and cheapest ways to deploy a website, and which enabled me to access the thermostat data and settings from anywhere with an Internet connection. 

#### New Heater to Control

At this point in my project, I had just moved to a new apartment which happily had its own [direct-vent gas furnace](https://www.williamscomfortprod.com/product/direct-vent-furnaces/) that put out a *lot* more heat than the small plug-in unit I had intially been controlling. 

<figure align="center" style="padding:10px 0 20px 0">
  <img src="/Images/heater.jpg" style="width:100%;max-width:400px;margin:1em 0 1em 0;">
  <figcaption class="figure-caption text-center">Gas-fired and a lot better at heating the place up than a ceramic heater</figcaption>
</figure>

These types of furnaces use a thermopile on their pilot lights to generate a small amount of current, which is then used to run a thermostat circuit. In most cases, this thermostat circuit is connected to a bimetallic thermostat, so the entire system is self-contained. To control this heater with my system, all I had to do was extend the circuit from the existing thermostat to my circuit, where a BJT allowed one of the digital pins of the ESP8266 to close the thermostat circuit, which turned the heater on via a solenoid valve on the gas feed line. This parallel wiring of thermostats allowed for non-mains electricity redundancy in the system, and brought the electrical layout of my system to its latest iteration - the wiring diagram is as follows:

<p align="center">
  <img src="/Images/schem.jpg" style="width:100%;max-width:600px;margin:1em 0 1em 0;">
</p>


While this additional connection has brought my thermostat system back near the heat source again, the thermostat circuit wires have given me easily five feet of separation between the two (enough for resonably accurate control), and my future goal is to use a second ESP8266 or even just the 433Mhz RX module in a simple circuit to accomplish the same on-off functionality in a physically separate circuit from the thermostat. With the electrical side of the system up to scratch, I moved on to my next goals for the data: to provide a method to search and display historical data, and to secure that data. 

<figure align="center" style="padding:10px 0 20px 0">
  <img src="/Images/board.jpg" style="width:100%;max-width:400px;margin:1em 0;">
  <figcaption class="figure-caption text-center">Thermostat setup on a breadboard, in this configuration without the 433MHz TX unit (thermostat wires are loose red/black at top of picture)</figcaption>
</figure>

#### Historical Data

The first challenge was to allow for a user to access not just the last five minutes of data from the controller, but the entire history of that data. With DynamoDB, queries can filter out data from certain windows of time pretty easily, given the timestamp for each item in my table (i.e. find every item with a timestamp between X and Y, where the format of X/Y is a number "YYYYMMDDhhmmss" corresponding to the UTC datetime of the data entry). What DynamoDB can't do well compared to a relational database is to take a query like the previous example, and then return every nth value, which in my case made loading even a couple hours of data prohibitively expensive in regards to DynamoDB read performance. Not wanting to load a hundred megabytes of data on a static page just to look at a month's worth of temperature data, I decided to split out my data tables into four distinct time intervals - 20 seconds, 5 minutes, 90 minutes, and 1 day (all 15 to 18 times larger than the previous interval). This allowed my ESP8266 to average the data over these intervals and input them into separate tables - a solution that I had to be careful implementing, as I didn't want to lose running averages every time the ESP8266 crashed or reset. With this new four-table data set in hand, I turned to examining what the best method of visualizing that data would be.

I ended up choosing [dygraphs](dygraphs.com) to display the data, due to its robust and interactive handling of large data sets. To dynamically load my data based on the desired range of datetimes, I turned to Josh Sanderson's excellent [demo](https://kaliatech.github.io/dygraphs-dynamiczooming-example/) of dynamically loading data to dygraphs, which I modified to use my DynamoDB tables as a data source. Using dygraphs also allowed me to tack on extras like using the [suncalc](https://github.com/mourner/suncalc) library to shade the nighttime sections of the graph (when the x-axis only spans 14 days or less). This allowed a robust visulization of the data from any point in the recording history: 

<p align="center">
  <img src="/Images/data.gif" style="width:100%;max-width:800px;margin:1em 0 1em 0;">
</p>

#### Securing Data Access

Unfortunately, my free level of DynamoDB access doesn't have the capacity to support more than a dozen or so simultaneous loads of the largest data sets (once the data set hits 2500 items, the query moves to the next time interval table). If you visit the [dashboard](/dashboard) of this site, you'll load an example data set as in Josh Sanderson's original demo, which gives you an idea of what it's like to browse my data. I also obviously didn't want my thermostat to be controllable by random visitors to this (public) site, so the switch you're toggling is purely cosmetic. To view data from and control my thermostat, I log in and use the exact same page. This functionality was added with AWS Cognito, which handles the use of any AWS services to which I grant it access, and to which I can add additional users with their own configuration data - meaning that another user with another device could control it and view its data through the same page. 

#### Putting it All Together

You can find the code for the website at [this repo](https://github.com/connorbenton/thermo-web), which I've essentially duplicated on my S3 bucket. I've set up CloudFront and Route 53 to deploy my site - Will Morgan has a wonderful [guide](https://medium.com/@willmorgan/moving-a-static-website-to-aws-s3-cloudfront-with-https-1fdd95563106) that walks through this entire process. For any of the code that doesn't make sense, or any other questions about the project, feel free to leave a comment or drop me a line and I'll do my best to explain it. I'm no expert in any of the fields involved in this project (I'm certainly not much of a web dev), but I've really enjoyed learning new tools and improving my system. I hope this summary can inspire you to try building your own home automation system, and give you a rough framework from which to start.

#### Future Objectives
* Add non-volatile FRAM to the physical system in order to better handle unplanned ESP8266 resets
* Transition to a ESP32 based board of my own design
* Program the board in bare C (possibly with the ESP IDF) instead of an Arduino approach
* Add setpoint control (I'm happy with my harcoded setting, but others may not be)
* Tweak the graph display to best show the humidity, PID output, and heater state alongside temperature (possibly toggling their visibility)
* Add scheduling (i.e. vacation mode, weekday/weekend settings) 
* Add control linked to smartphone location or room movement/light sensors (possibly with controller directly, possibly with an AWS Lambda backend) 
* Experiment with adding AWS IoT functionality to controller, supplanting the current direct-to-DynamoDB approach in order to have a more 'socket-like' connection
* Experiment with data analysis and machine learning - scoring scenarios based on PID variables, output window size, external temperature data, etc.

<figure align="center" style="padding:10px 0 20px 0">
  <img src="/Images/case.jpg" style="width:100%;max-width:400px;margin:1em 0 1em 0;">
  <figcaption class="figure-caption text-center">Small 3D printed case that I stick the setup into, after tying everything together with jumper wires</figcaption>
</figure>
