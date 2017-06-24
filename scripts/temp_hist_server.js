ServerDataSimulator = function (seriesName, minDelay, maxDelay) {
    this.seriesName = seriesName;
    // this.minDelay = minDelay === undefined ? 100 : minDelay;
    // this.maxDelay = maxDelay === undefined ? 1000 : maxDelay;

    this.onServerDataLoadCallbacks = $.Callbacks();
  };

  ServerDataSimulator.prototype.loadData = function (dataLoadReq) {
    //console.log("loadData", dataLoadReq);

    //Generate fake raw data set on first call
    // if (!this.serverData) {
      // this._generateServerData();
    // }

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
		S: "Thermostat_01"
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

dynamodb.query(paramsdygraph, function(err, data) {
     if (err)
       console.log(JSON.stringify(err, null, 3));
     else
//         console.log(JSON.stringify(data, null, 3));

       data.Items.forEach(function(item) {
         // curtime3 = moment.utc(item.Date.toString(), "YYYYMMDDHHmmss");
         curtime3 = moment.utc(item.Date.N, "YYYYMMDDHHmmss");
         curtime3.local();
	       // var b = parseFloat(item.temp.N);
         // dataPoints.push({x: new Date(curtime3.format("YYYY/MM/DD HH:mm:ss")), temp: parseFloat(item.temp.N), humidity: parseFloat(item.humidity.N), heaterState: parseFloat(item.heaterState.N), pidOutput: parseFloat(item.pidOutput.N)});
         dataPoints.push({x: curtime3, temp: parseFloat(item.temp.N), humidity: parseFloat(item.humidity.N), heaterState: parseFloat(item.heaterState.N), pidOutput: parseFloat(item.pidOutput.N)});
       });
	dataPoints = dataPoints.reverse();
	that._onDataLoad.call(that, dataLoadReq, dataPoints);

      // console.log(dataPoints);
});

// this._onDataLoad(dataLoadReq, dataPoints);

// this._onDataLoad(dataLoadReq, dataPoints);

    // var delay = (Math.random() * (this.maxDelay - this.minDelay)) + this.minDelay;

    //console.log("dataPoints", dataLoadReq, dataPoints);

    //Random delay for "_onDataLoad" callback to simulate loading data from real server
    // setTimeout($.proxy(this._onDataLoad, this, dataLoadReq, dataPoints), 100);

  };


  ServerDataSimulator.prototype._onDataLoad = function (dataLoadReq, dataPoints) {

    var dataLoadResp = {
      dataPoints: dataPoints
    };

    // ServerDataSimulator.prototype.onServerDataLoadCallbacks.fire(dataLoadReq, dataLoadResp);
    this.onServerDataLoadCallbacks.fire(dataLoadReq, dataLoadResp);
  };

