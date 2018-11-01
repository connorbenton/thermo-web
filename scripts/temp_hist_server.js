ServerDataSimulator = function (seriesName, minDelay, maxDelay) {
    this.seriesName = seriesName;
    // this.minDelay = minDelay === undefined ? 100 : minDelay;
    // this.maxDelay = maxDelay === undefined ? 1000 : maxDelay;

    this.onServerDataLoadCallbacks = $.Callbacks();
  };

  ServerDataSimulator.prototype.loadData = function (dataLoadReq) {
    //console.log("loadData", dataLoadReq);

    //Generate fake raw data set on first call

    //Do down sampling per the dataLoadReq
    var dataPoints = [];

    var intervalTime = (dataLoadReq.endDateTm.getTime() - dataLoadReq.startDateTm.getTime());
    var timePerInterval = intervalTime / dataLoadReq.numIntervals;
    var currTime = dataLoadReq.startDateTm.getTime();
	  if ((timePerInterval > 86400000) || (intervalTime / 5400000) > 2499) {
		  var tableUsed = 'Temperatures_1_day';
       	  } else if ((timePerInterval > 5400000 && timePerInterval < 86400000) || (intervalTime / 300000) > 2499) {
		  var tableUsed = 'Temperatures_90_min';
	  } else if ((timePerInterval > 300000 && timePerInterval < 5400000) || (intervalTime / 20000) > 2499) {
		  var tableUsed = 'Temperatures_5_min';
	  } else if (timePerInterval < 300000) {
		  var tableUsed = 'Temperatures_20_sec'
	  }

var startTimeUTC = dataLoadReq.startDateTm;	  
var startTimeStamp = startTimeUTC.getUTCSeconds() + startTimeUTC.getUTCMinutes() * 100 + startTimeUTC.getUTCHours() * 10000 + startTimeUTC.getUTCDate() * 1000000 + (startTimeUTC.getUTCMonth()+1) * 100000000 + startTimeUTC.getUTCFullYear() * 10000000000; 	  
var endTimeUTC = dataLoadReq.endDateTm;	  
var endTimeStamp = endTimeUTC.getUTCSeconds() + endTimeUTC.getUTCMinutes() * 100 + endTimeUTC.getUTCHours() * 10000 + endTimeUTC.getUTCDate() * 1000000 + (endTimeUTC.getUTCMonth()+1) * 100000000 + endTimeUTC.getUTCFullYear() * 10000000000; 	  

// AWS.config.region = 'us-west-1'; // Region

		// var dynamodb = new dynamo.DocumentClient();

var paramsdygraph = {
    TableName: tableUsed,
//     ProjectionExpression: "temp",
    Limit: 2500,
    ScanIndexForward: false,
	// ProjectionExpression: "Id, #dt",
    KeyConditionExpression: "Id = :therm and #dt between :dt1 and :dt2",
	ExpressionAttributeNames: {
		"#dt": "Date"
	},
    ExpressionAttributeValues: {
        ":therm": {
		S: "5C:CF:7F:13:2B:55"
	},
	":dt1": {
		N: startTimeStamp.toString()
	},
	":dt2": {
		N: endTimeStamp.toString()
	}
    }
};
var that = this;
var curtime3 = [];
var credentialtryflag = true;

function dynamoDBquery(paramsdygraph){
dynamodb.query(paramsdygraph, function(err, data) {
     if (err) { 
	if (refreshCredentials() && credentialtryflag) {
		credentialtryflag = false;
		dynamoDBquery(paramsdygraph);
		return;
	}
       console.log(JSON.stringify(err, null, 3));
     }
     else
//         console.log(JSON.stringify(data, null, 3));
	credentialtryflag = true;
       data.Items.forEach(function(item) {
         if (item.temp != null && item.humidity != null) {
         // curtime3 = moment.utc(item.Date.toString(), "YYYYMMDDHHmmss");
         curtime3 = moment.utc(item.Date.N, "YYYYMMDDHHmmss");
         curtime3.local();
	       // var b = parseFloat(item.temp.N);
         // dataPoints.push({x: new Date(curtime3.format("YYYY/MM/DD HH:mm:ss")), temp: parseFloat(item.temp.N), humidity: parseFloat(item.humidity.N), heaterState: parseFloat(item.heaterState.N), pidOutput: parseFloat(item.pidOutput.N)});
        //  dataPoints.push({x: curtime3, temp: parseFloat(item.temp.N), humidity: parseFloat(item.humidity.N), heaterState: parseFloat(item.heaterState.N), pidOutput: parseFloat(item.pidOutput.N)});
        //  console.log(item);
         dataPoints.push({x: curtime3, temp: parseFloat(item.temp.N), humidity: parseFloat(item.humidity.N)});
         }
       });
	dataPoints = dataPoints.reverse();
	that._onDataLoad.call(that, dataLoadReq, dataPoints);

      // console.log(dataPoints);
});
}
if (dynamodb != null) {
	dynamoDBquery(paramsdygraph);
} else {

    if (!this.serverData) {
      this._generateServerData();
    }

    var dataPoints = [];

var timePerInterval = (dataLoadReq.endDateTm.getTime() - dataLoadReq.startDateTm.getTime()) / dataLoadReq.numIntervals;
    var currTime = dataLoadReq.startDateTm.getTime();

    //Find start of load request in the raw dataset
    var currIdx = 0;
    for (var i = 0; i < this.serverData.length; i++) {

      if (this.serverData[currIdx].x < (currTime - timePerInterval))
        currIdx++;
      else
        break;
    }

    // Calculate average/min/max while downsampling
    while (currIdx < this.serverData.length && currTime < dataLoadReq.endDateTm.getTime()) {
      var numPoints = 0;
      var sum = 0;
      var min = 9007199254740992;
      var max = -9007199254740992;

      while (currIdx < this.serverData.length && this.serverData[currIdx].x < currTime) {
        sum += this.serverData[currIdx].y;
        min = Math.min(min, this.serverData[currIdx].y);
        max = Math.max(max, this.serverData[currIdx].y);
        currIdx++;
        numPoints++;
      }

      var temp = sum / numPoints

      if (numPoints == 0) {
        if (dataLoadReq.includeMinMax) {
          dataPoints.push({
            x: currTime,
            temp: null,
            min: null,
            max: null
          });
        }
        else {
          dataPoints.push({x: currTime, temp: null});
        }
      }
      else {
        if (dataLoadReq.includeMinMax) {
          dataPoints.push({
            x: currTime,
            temp: Math.round(temp),
            min: Math.round(min),
            max: Math.round(max)
          });
        }
        else {
          dataPoints.push({x: currTime, temp: temp});
        }
      }

      currTime += timePerInterval;
      currTime = Math.round(currTime);
    }
	// this._onDataLoad.call(this, dataLoadReq, dataPoints);
setTimeout($.proxy(this._onDataLoad, this, dataLoadReq, dataPoints), 400);
}

// this._onDataLoad(dataLoadReq, dataPoints);

// this._onDataLoad(dataLoadReq, dataPoints);

    // var delay = (Math.random() * (this.maxDelay - this.minDelay)) + this.minDelay;

    //console.log("dataPoints", dataLoadReq, dataPoints);

    //Random delay for "_onDataLoad" callback to simulate loading data from real server
    // setTimeout($.proxy(this._onDataLoad, this, dataLoadReq, dataPoints), 100);

  };

ServerDataSimulator.prototype._generateServerData = function () {

    var startMom = moment().utc();
	  startMom.add(-3, 'year');
	
    var endMom = moment().utc();
    endMom.add(30, 'day');

    var min = 50;
    var max = 80;
    var majorInterval = moment.duration(11, 'days');
    var minorInterval = moment.duration(1, 'minute');

    // if (this.seriesName == "Series-A") {
    //   majorInterval = moment.duration(11, 'days');
    //   minorInterval = moment.duration(1, 'minute');
    // }
    // else if (this.seriesName == "Series-B") {
    //   majorInterval = moment.duration(5, 'days');
    //   minorInterval = moment.duration(5, 'minute');
    // }
    // else {
    //   majorInterval = moment.duration(20, 'days');
    //   minorInterval = moment.duration(10, 'minute');
    // }

    var data = [];

    var totalDur = endMom.valueOf() - startMom.valueOf();

    var currTime = startMom.valueOf();
    var numPoints = (endMom.valueOf() - startMom.valueOf()) / minorInterval.valueOf();


    var period = majorInterval.valueOf();
    var periodNum = currTime / period;

    // just need a number that can change as we iterate, but stays
    // the same for each reload of data set given same start/end dates. This makes the overall trend look the same every time
    // for a given series, and might avoid some confusion in the demo.
    var periodIncr;
    var detailFactor;

    // if (this.seriesName == "Series-A") {
      periodIncr = startMom.date() / 31.0; //1-31
      detailFactor = 2 + (Math.random() * 5);
    // }
    // else if (this.seriesName == "Series-B") {
      // periodIncr = ((endMom.date() - 5) / 31.0) * 2; //1-31
      // detailFactor = 150 + (Math.random() * 650);
    // }
    // else {
      // periodIncr = Math.random();
      // detailFactor = 20 + (Math.random() * 250);
    // }

    var lastY = min;


    for (var i = 0; i < numPoints; i++) {
      if (Math.floor(currTime / period) != periodNum) {
        periodNum = Math.floor(currTime / period);
        periodIncr = moment(currTime).date() / 31.0;
        periodIncr = periodIncr * ((0.09) - (0.09 / 2));
      }
      else {

        if (lastY > (max + min) / 2)
          periodIncr = periodIncr - (lastY / (max + min)) * .000002;
        else
          periodIncr = periodIncr + ((max + min - lastY) / (max + min)) * .000002;
      }

      if (Math.floor(currTime / (period / 4) != periodNum)) {
        detailFactor = 2 + (Math.random() * 5);
      }


      lastY += periodIncr;
      if (lastY > max) {
        periodIncr = periodIncr * -1;
      }
      else if (lastY < min) {
        periodIncr = periodIncr * -1;
      }


      var detailY = lastY + (Math.random() - 0.5) * detailFactor;
//      if (detailY > max)
//        detailY = max;
//      if (detailY < min)
//        detailY = min;

      data.push({ x: currTime, y: detailY});
      currTime += minorInterval.valueOf();
    }

    this.serverData = data;

  };

  ServerDataSimulator.prototype._onDataLoad = function (dataLoadReq, dataPoints) {

    var dataLoadResp = {
      dataPoints: dataPoints
    };

    // ServerDataSimulator.prototype.onServerDataLoadCallbacks.fire(dataLoadReq, dataLoadResp);
    this.onServerDataLoadCallbacks.fire(dataLoadReq, dataLoadResp);
  };

