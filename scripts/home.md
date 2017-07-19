
## Building My Own Cloud Thermostat

#### Project Inspiration
**(todo: check into changing link color to make more visible)**

**(todo: insert pics of wall heaters, hardware, etc)**

**(todo: center pad and align the text/inline the images (look at the George Dewar wordpress example))**

The site you're visiting right now started out as a simple Arduino project roughly a year and a half ago; when I moved into a new apartment after finishing school, the only way I could heat my room was with a small plug-in unit. Not trusting the built-in thermostat on the device itself (wanting to introduce my own implementation of [hysteresis](https://en.wikipedia.org/wiki/Hysteresis) by controlling it from a temperature measurement point farther away in the room), I initially drew inspiration from [George Dewar](https://georgedewar.wordpress.com/2015/07/27/using-pid-on-an-arduino-to-control-an-electric-heater/) and decided to create my own thermostat.

#### First take

Initially, my parts list was:

* Arduino Uno
* DHT22
* Generic 433Mhz RF RX/TX pair
* 433Mhz RF controlled outlet (Etekcity) 

You can find the Arduino code that this project uses at [this repo](https://github.com/connorbenton/espthermostat) - I started using Git long after the the Arduino side of this project was finished, but I've tried to clean it up and comment it out to show where it began and how it grew over time. I used a 433Mhz link as opposed to an inline relay solution (like a Sonoff) due to wanting the temperature measurement far away from the heat source in the room, as mentioned above. After identifying the transmit codes which triggered the outlet (with the 433Mhz receiver and the included outlet remote), the transmitter was set up to cycle the outlet, and thus the heater, on and off corresponding to the duty cycle indicated by a [PI control](https://en.wikipedia.org/wiki/PID_controller) **(todo: check if it was PI or full PID)**. This control took inputs from the DHT22, and acted over a window of 15 minutes. At this stage, the setup already did a good job of keeping the room at a comfortable temperature during the night, but I wondered just how well it was working. 

#### Getting Online

My next two goals were to provide a method to toggle the thermostat *off/auto/on* similar to most modern units, and to display the temperature (and PI output) over the most recent five minutes. Even though the 433 Mhz link enabled me to keep the system sitting next to my computer, I also desired a solution where I didn't require a wired connection and an always-on system (I don't own a Raspberry Pi, sue me) to record data and control the thermostat. Conceptually, I preferred the decentralized idea of having the thermostat functioning independently within my home network without a middleman like a Pi, prioritizing the ability to deploy this system in other places and to other people (friends, family) without any configuration needed beyond changing a couple WiFi settings and AWS variables (more on that in a second). I also didn't particularly care to keep this system local, as I wanted to eventually enable control and monitoring from anywhere, and in the event of Internet or power outages preferred to revert to manual failsafes (I live in coastal California now, but grew up in Minnesota where it's a decidedly risky choice to omit a [mechanical thermostat](https://en.wikipedia.org/wiki/Bimetallic_strip#Thermostats) from a gas heating system, unless you enjoy the idea of frozen pipes bursting and flooding your house in -20&deg;F weather). Instead of using an existing service for direct Internet/microcontroller IoT connections - Blynk, Cayenne, etc - and accepting all the limitations and dependencies that come hand in hand with them (not to trash them at all, they're fantastic solutions for prototyping), I decided to build my own system, and after a bit of research settled on a AWS based solution. 

#### DynamoDB and ESP8266

The easiest (and cheapest) way on AWS to store the data I had in mind was DynamoDB - see [Tony DiCola's Cloud Thermometer project](https://learn.adafruit.com/cloud-thermometer/overview#why-dynamodb) for a more in-depth justification of the choice. The aforementioned project, not to mention the [extensive](http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html) [Amazon](https://sdk.amazonaws.com/cpp/api/LATEST/class_aws_1_1_dynamo_d_b_1_1_dynamo_d_b_client.html) [documentation](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property) were great starting points for what I was trying to do, which was to serve a website to both:

* Change the state of a single item DynamoDB table to correspond to *off/auto/on*, which the controller would periodically poll to determine its state
* Read the most recent data from the controller, which would be appending the newest data every 20 seconds to another DynamoDB table

The controller I settled on for receiving and sending data directly to DyanmoDB was an ESP8266, which already was fully compatible with my existing controller code via the [Arduino core](https://github.com/esp8266/Arduino) for the system, and which many have noted is remarkably powerful given its cost. I specifically used a NodeMCU development board, but in the future would love to explore creating a custom board for the ESP8266 if I ever get to the point where I think I won't change the circuit design any further (maybe I'll leave that until I migrate this project to an ESP32 some day). 
