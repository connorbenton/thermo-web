

AWS.config.update({ accessKeyId: 'AKIAIFUKTLKXUMSVHXSA',
                secretAccessKey: '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' });
AWS.config.region = 'us-west-1'; // Region

var dynamodb = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: 'Temperatures',
//     ProjectionExpression: "temp",
    Limit: 50,
    ScanIndexForward: false,
    KeyConditionExpression: "Id = :therm",
    ExpressionAttributeValues: {
        ":therm": "DHT22"
    }
};

// var paramsdygraph = {
//     TableName: 'Temperatures',
//     // ProjectionExpression: "Id, #dt, #tmp",
//     Limit: 500,
//     ScanIndexForward: true,
//     KeyConditionExpression: "Id = :therm and #dt >:date1",
//     ExpressionAttributeNames:{
//         "#dt": "Date",
//         // "#tmp": "Temp"
//     },
//     ExpressionAttributeValues: {
//         ":therm": "DHT22",
//         ":date1": 20170520000000,
//         // ":date2": "20170521000000"
//     }
// };

var paramsInitializeSlider = {
    TableName: 'HeaterManualState',
    KeyConditionExpression: "Id = :resourceFromSite",
    ExpressionAttributeValues: {
        ":resourceFromSite": "Website"
    }
};

var paramsOnUpdate = {
    TableName: 'HeaterManualState',
    Key: {
      "Id":"Website",
      "Date": 1
    },
    UpdateExpression: "SET WebsiteHeaterState = :resourceFromSite",
    ExpressionAttributeValues: {
        ":resourceFromSite": "3"
    },
    ReturnValues: "ALL_NEW"
};

var paramsAutoUpdate = {
    TableName: 'HeaterManualState',
    Key: {
      "Id":"Website",
      "Date": 1
    },
    UpdateExpression: "SET WebsiteHeaterState = :resourceFromSite",
    ExpressionAttributeValues: {
        ":resourceFromSite": "2"
    },
    ReturnValues: "ALL_NEW"
};

var paramsOffUpdate = {
    TableName: 'HeaterManualState',
    Key: {
      "Id":"Website",
      "Date": 1
    },
    UpdateExpression: "SET WebsiteHeaterState = :resourceFromSite",
    ExpressionAttributeValues: {
        ":resourceFromSite": "1"
    },
    ReturnValues: "ALL_NEW"
};

$("#on").on('change', function() {

 $('#light-bulb2').css({'opacity': '1'});

 dynamodb.update(paramsOnUpdate, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

});

$("#automatic").on('change', function() {

 dynamodb.update(paramsAutoUpdate, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

});

$("#off").on('change', function() {

 $('#light-bulb2').css({'opacity': '0'});

 dynamodb.update(paramsOffUpdate, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

});

var myChart;

var xAxisTime = [];
var yAxisTemp = [];
var curtime;
var pidout = [];
var heatout = [];

var xAxisTime2 = [];
var yAxisTemp2 = [];
var curtime2;
var pidout2 = [];
var heatout2 = [];

var dyArray = [];
var curtime3 = [];

 dynamodb.query(params, function(err, data) {
      if (err)
        console.log(JSON.stringify(err, null, 3));
      else
//         console.log(JSON.stringify(data, null, 3));

        data.Items.forEach(function(item) {
          curtime = moment.utc(item.Date.toString(), "YYYYMMDDHHmmss");
          curtime.local();
          xAxisTime.push(curtime.format("HH:mm:ss"));
          yAxisTemp.push(item.temp.toString());
          pidout.push(item.pidOutput.toString());
          heatout.push(item.heaterState.toString());
        });
        xAxisTime = xAxisTime.reverse();
        yAxisTemp = yAxisTemp.reverse();
        pidout = pidout.reverse();
        heatout = heatout.reverse();
        //console.log(JSON.stringify(xAxisTime, null, 3));
        //console.log(JSON.stringify(yAxisTemp, null, 3));
        //console.log(JSON.stringify(pidout, null, 3));

});

// dynamodb.query(paramsdygraph, function(err, data) {
//      if (err)
//        console.log(JSON.stringify(err, null, 3));
//      else
// //         console.log(JSON.stringify(data, null, 3));
//
//        data.Items.forEach(function(item) {
//          curtime3 = moment.utc(item.Date.toString(), "YYYYMMDDHHmmss");
//          curtime3.local();
//          dyArray.push([ new Date(curtime3.format("YYYY/MM/DD HH:mm:ss")) , item.temp]);
//        });
//       console.log(dyArray[1]);
// });

var ctx = document.getElementById('myChart').getContext('2d');

var myVar = setTimeout(initialUpdate, 500);

var InitialSlider;

  dynamodb.query(paramsInitializeSlider, function(err, data) {
      if (err)
        console.log(JSON.stringify(err, null, 3));
      else

      data.Items.forEach(function(item) {
        InitialSlider = item.WebsiteHeaterState;
      });
//       console.log(JSON.stringify(InitialSlider, null, 3));
  });


function initialUpdate(){

//       console.log(JSON.stringify(InitialSlider == "3", null, 3));

  if (InitialSlider == "1") {
      $("#off").prop("checked", true);
      //console.log(JSON.stringify("Turned Off", null, 3));
  } else if (InitialSlider == "2") {
      $("#automatic").prop("checked", true);
      //console.log(JSON.stringify("Turned Auto", null, 3));
  } else if (InitialSlider == "3") {
      $("#on").prop("checked", true);
      //console.log(JSON.stringify("Turned On", null, 3));
  }

  // g = new Dygraph(
  //
  //   // containing div
  //   document.getElementById("graphdiv"),
  //
  //   // CSV or path to a CSV file.
  //   // dyArray,
  //   // "C:/Users/cbenton/Documents/S3Site/TableFormatted.csv",
  //   "https://s3-us-west-1.amazonaws.com/thermostat3355/TableFormatted.csv",
  //   {
  //     rollPeriod: 7,
  //     showRoller: true
  //   }
  //
  // );

 myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: xAxisTime,
    datasets: [{
      label: 'temp',
      yAxisID: "y-axis-0",
      data: yAxisTemp,
      backgroundColor: "rgba(153,255,51,0.4)"
    }, {
      label: 'PID Output',
      yAxisID: "y-axis-1",
      data: pidout,
      backgroundColor: "rgba(255,153,0,0.4)"
    }, {
      label: 'Heater State',
      yAxisID: "y-axis-1",
      data: heatout,
      backgroundColor: "rgba(0,0,0,0.2)"
    }]
  },
  options: {
    scales: {
      yAxes: [
  {
   scaleLabel: { display: true, labelString: 'Temperature' },
   position: 'left', id: 'y-axis-0',type: 'linear',
   ticks: { min: 50, beginAtZero: false, stepSize: 5, max: 90 }
  },
  {
   scaleLabel: { display: true, labelString: 'PID Output / Heater State' },
   position: 'right', id: 'y-axis-1',type: 'linear',
   ticks: { min: 0, beginAtZero: true, max: 100 },
   gridLines: { display: false }
  }
  ]
    }
  }
});

};

// console.log(JSON.stringify(xAxisTime, null, 3));

var params2 = {
    TableName: 'Temperatures',
//     ProjectionExpression: "temp",
    Limit: 1,
    ScanIndexForward: false,
    KeyConditionExpression: "Id = :therm",
    ExpressionAttributeValues: {
        ":therm": "DHT22"
    }
};

// var ctx = document.getElementById('myChart').getContext('2d');
// var latestLabels = myChart.labels[49];

// var updateVar = setTimeout(updateChart, 9000);
var updateVar2 = setInterval(updateChart, 9000);

function updateChart(){
  //add latest data to chart
 dynamodb.query(params2, function(err, data) {
      if (err)
        console.log(JSON.stringify(err, null, 3));
      else
//         console.log(JSON.stringify(data, null, 3));

        data.Items.forEach(function(item) {
          curtime2 = moment.utc(item.Date.toString(), "YYYYMMDDHHmmss");
          curtime2.local();
          xAxisTime2[0] = curtime2.format("HH:mm:ss");
          yAxisTemp2[0] = item.temp.toString();
          pidout2[0] = item.pidOutput.toString();
          heatout2[0] = item.heaterState.toString();
        });
// //         xAxisTime2 = xAxisTime2.reverse();
// //         yAxisTemp2 = yAxisTemp2.reverse();
// //         pidout = pidout2.reverse();
//         console.log(JSON.stringify(xAxisTime2, null, 3));
//         console.log(JSON.stringify(yAxisTemp2, null, 3));
//         console.log(JSON.stringify(pidout2, null, 3));
// console.log(JSON.stringify(xAxisTime[49], null, 3));
// console.log(JSON.stringify(xAxisTime2[0], null, 3));
         if (xAxisTime[49] != xAxisTime2[0])
         {
//          myChart.addData([yAxisTemp2, pidout2], xAxisTime2);
         xAxisTime.push(xAxisTime2[0]);
         yAxisTemp.push(yAxisTemp2[0]);
         pidout.push(pidout2[0]);
         heatout.push(heatout2[0]);
//          myChart.removeData();
         xAxisTime.shift();
         yAxisTemp.shift();
         pidout.shift();
         heatout.shift();

         myChart.update();
         }
 });

    dynamodb.query(paramsInitializeSlider, function(err, data) {
      if (err)
        console.log(JSON.stringify(err, null, 3));
      else

      data.Items.forEach(function(item) {
        InitialSlider = item.WebsiteHeaterState;
      });
//       console.log(JSON.stringify(InitialSlider, null, 3));


    if (InitialSlider == "1") {
      $("#off").prop("checked", true);
      // console.log(JSON.stringify("Turned Off", null, 3));
  } else if (InitialSlider == "2") {
      $("#automatic").prop("checked", true);
      // console.log(JSON.stringify("Turned Auto", null, 3));
  } else if (InitialSlider == "3") {
      $("#on").prop("checked", true);
      // console.log(JSON.stringify("Turned On", null, 3));
  }
  });

 };


// if (err) console.log(err, err.stack); // an error occurred
// else{
//     var xAxisTime = [];
//     var yAxisTemp = [];
//     data.Items.forEach(function(item) {
//         xAxisTime.push(item.Date.toString());
//         yAxisTemp.push(item.temp.toString());
//     });
// //Chart.js code
// var lineChartData = {
//     labels : recentEventsDateTime,
//     datasets : [
//     {
//         label: "JustGiving Pages Views",
//         fillColor : "rgba(151,187,205,0.2)",
//         strokeColor : "rgba(151,187,205,1)",
//         pointColor : "rgba(151,187,205,1)",
//         pointStrokeColor : "#fff",
//         pointHighlightFill : "#fff",
//         pointHighlightStroke : "rgba(151,187,205,1)",
//         data : recentEventsCounter
//      }
//     ]}





AWS.config.update({ accessKeyId: 'AKIAIFUKTLKXUMSVHXSA',
                secretAccessKey: '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' });
AWS.config.region = 'us-west-1'; // Region

var dynamodb = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: 'Temperatures',
//     ProjectionExpression: "temp",
    Limit: 50,
    ScanIndexForward: false,
    KeyConditionExpression: "Id = :therm",
    ExpressionAttributeValues: {
        ":therm": "DHT22"
    }
};

// var paramsdygraph = {
//     TableName: 'Temperatures',
//     // ProjectionExpression: "Id, #dt, #tmp",
//     Limit: 500,
//     ScanIndexForward: true,
//     KeyConditionExpression: "Id = :therm and #dt >:date1",
//     ExpressionAttributeNames:{
//         "#dt": "Date",
//         // "#tmp": "Temp"
//     },
//     ExpressionAttributeValues: {
//         ":therm": "DHT22",
//         ":date1": 20170520000000,
//         // ":date2": "20170521000000"
//     }
// };

var paramsInitializeSlider = {
    TableName: 'HeaterManualState',
    KeyConditionExpression: "Id = :resourceFromSite",
    ExpressionAttributeValues: {
        ":resourceFromSite": "Website"
    }
};

var paramsOnUpdate = {
    TableName: 'HeaterManualState',
    Key: {
      "Id":"Website",
      "Date": 1
    },
    UpdateExpression: "SET WebsiteHeaterState = :resourceFromSite",
    ExpressionAttributeValues: {
        ":resourceFromSite": "3"
    },
    ReturnValues: "ALL_NEW"
};

var paramsAutoUpdate = {
    TableName: 'HeaterManualState',
    Key: {
      "Id":"Website",
      "Date": 1
    },
    UpdateExpression: "SET WebsiteHeaterState = :resourceFromSite",
    ExpressionAttributeValues: {
        ":resourceFromSite": "2"
    },
    ReturnValues: "ALL_NEW"
};

var paramsOffUpdate = {
    TableName: 'HeaterManualState',
    Key: {
      "Id":"Website",
      "Date": 1
    },
    UpdateExpression: "SET WebsiteHeaterState = :resourceFromSite",
    ExpressionAttributeValues: {
        ":resourceFromSite": "1"
    },
    ReturnValues: "ALL_NEW"
};

$("#on").on('change', function() {

 $('#light-bulb2').css({'opacity': '1'});

 dynamodb.update(paramsOnUpdate, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

});

$("#automatic").on('change', function() {

 dynamodb.update(paramsAutoUpdate, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

});

$("#off").on('change', function() {

 $('#light-bulb2').css({'opacity': '0'});

 dynamodb.update(paramsOffUpdate, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

});

var myChart;

var xAxisTime = [];
var yAxisTemp = [];
var curtime;
var pidout = [];
var heatout = [];

var xAxisTime2 = [];
var yAxisTemp2 = [];
var curtime2;
var pidout2 = [];
var heatout2 = [];

var dyArray = [];
var curtime3 = [];

 dynamodb.query(params, function(err, data) {
      if (err)
        console.log(JSON.stringify(err, null, 3));
      else
//         console.log(JSON.stringify(data, null, 3));

        data.Items.forEach(function(item) {
          curtime = moment.utc(item.Date.toString(), "YYYYMMDDHHmmss");
          curtime.local();
          xAxisTime.push(curtime.format("HH:mm:ss"));
          yAxisTemp.push(item.temp.toString());
          pidout.push(item.pidOutput.toString());
          heatout.push(item.heaterState.toString());
        });
        xAxisTime = xAxisTime.reverse();
        yAxisTemp = yAxisTemp.reverse();
        pidout = pidout.reverse();
        heatout = heatout.reverse();
        //console.log(JSON.stringify(xAxisTime, null, 3));
        //console.log(JSON.stringify(yAxisTemp, null, 3));
        //console.log(JSON.stringify(pidout, null, 3));

});

// dynamodb.query(paramsdygraph, function(err, data) {
//      if (err)
//        console.log(JSON.stringify(err, null, 3));
//      else
// //         console.log(JSON.stringify(data, null, 3));
//
//        data.Items.forEach(function(item) {
//          curtime3 = moment.utc(item.Date.toString(), "YYYYMMDDHHmmss");
//          curtime3.local();
//          dyArray.push([ new Date(curtime3.format("YYYY/MM/DD HH:mm:ss")) , item.temp]);
//        });
//       console.log(dyArray[1]);
// });

var ctx = document.getElementById('myChart').getContext('2d');

var myVar = setTimeout(initialUpdate, 500);

var InitialSlider;

  dynamodb.query(paramsInitializeSlider, function(err, data) {
      if (err)
        console.log(JSON.stringify(err, null, 3));
      else

      data.Items.forEach(function(item) {
        InitialSlider = item.WebsiteHeaterState;
      });
//       console.log(JSON.stringify(InitialSlider, null, 3));
  });


function initialUpdate(){

//       console.log(JSON.stringify(InitialSlider == "3", null, 3));

  if (InitialSlider == "1") {
      $("#off").prop("checked", true);
      //console.log(JSON.stringify("Turned Off", null, 3));
  } else if (InitialSlider == "2") {
      $("#automatic").prop("checked", true);
      //console.log(JSON.stringify("Turned Auto", null, 3));
  } else if (InitialSlider == "3") {
      $("#on").prop("checked", true);
      //console.log(JSON.stringify("Turned On", null, 3));
  }

  // g = new Dygraph(
  //
  //   // containing div
  //   document.getElementById("graphdiv"),
  //
  //   // CSV or path to a CSV file.
  //   // dyArray,
  //   // "C:/Users/cbenton/Documents/S3Site/TableFormatted.csv",
  //   "https://s3-us-west-1.amazonaws.com/thermostat3355/TableFormatted.csv",
  //   {
  //     rollPeriod: 7,
  //     showRoller: true
  //   }
  //
  // );

 myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: xAxisTime,
    datasets: [{
      label: 'temp',
      yAxisID: "y-axis-0",
      data: yAxisTemp,
      backgroundColor: "rgba(153,255,51,0.4)"
    }, {
      label: 'PID Output',
      yAxisID: "y-axis-1",
      data: pidout,
      backgroundColor: "rgba(255,153,0,0.4)"
    }, {
      label: 'Heater State',
      yAxisID: "y-axis-1",
      data: heatout,
      backgroundColor: "rgba(0,0,0,0.2)"
    }]
  },
  options: {
    scales: {
      yAxes: [
  {
   scaleLabel: { display: true, labelString: 'Temperature' },
   position: 'left', id: 'y-axis-0',type: 'linear',
   ticks: { min: 50, beginAtZero: false, stepSize: 5, max: 90 }
  },
  {
   scaleLabel: { display: true, labelString: 'PID Output / Heater State' },
   position: 'right', id: 'y-axis-1',type: 'linear',
   ticks: { min: 0, beginAtZero: true, max: 100 },
   gridLines: { display: false }
  }
  ]
    }
  }
});

};

// console.log(JSON.stringify(xAxisTime, null, 3));

var params2 = {
    TableName: 'Temperatures',
//     ProjectionExpression: "temp",
    Limit: 1,
    ScanIndexForward: false,
    KeyConditionExpression: "Id = :therm",
    ExpressionAttributeValues: {
        ":therm": "DHT22"
    }
};

// var ctx = document.getElementById('myChart').getContext('2d');
// var latestLabels = myChart.labels[49];

// var updateVar = setTimeout(updateChart, 9000);
var updateVar2 = setInterval(updateChart, 9000);

function updateChart(){
  //add latest data to chart
 dynamodb.query(params2, function(err, data) {
      if (err)
        console.log(JSON.stringify(err, null, 3));
      else
//         console.log(JSON.stringify(data, null, 3));

        data.Items.forEach(function(item) {
          curtime2 = moment.utc(item.Date.toString(), "YYYYMMDDHHmmss");
          curtime2.local();
          xAxisTime2[0] = curtime2.format("HH:mm:ss");
          yAxisTemp2[0] = item.temp.toString();
          pidout2[0] = item.pidOutput.toString();
          heatout2[0] = item.heaterState.toString();
        });
// //         xAxisTime2 = xAxisTime2.reverse();
// //         yAxisTemp2 = yAxisTemp2.reverse();
// //         pidout = pidout2.reverse();
//         console.log(JSON.stringify(xAxisTime2, null, 3));
//         console.log(JSON.stringify(yAxisTemp2, null, 3));
//         console.log(JSON.stringify(pidout2, null, 3));
// console.log(JSON.stringify(xAxisTime[49], null, 3));
// console.log(JSON.stringify(xAxisTime2[0], null, 3));
         if (xAxisTime[49] != xAxisTime2[0])
         {
//          myChart.addData([yAxisTemp2, pidout2], xAxisTime2);
         xAxisTime.push(xAxisTime2[0]);
         yAxisTemp.push(yAxisTemp2[0]);
         pidout.push(pidout2[0]);
         heatout.push(heatout2[0]);
//          myChart.removeData();
         xAxisTime.shift();
         yAxisTemp.shift();
         pidout.shift();
         heatout.shift();

         myChart.update();
         }
 });

    dynamodb.query(paramsInitializeSlider, function(err, data) {
      if (err)
        console.log(JSON.stringify(err, null, 3));
      else

      data.Items.forEach(function(item) {
        InitialSlider = item.WebsiteHeaterState;
      });
//       console.log(JSON.stringify(InitialSlider, null, 3));


    if (InitialSlider == "1") {
      $("#off").prop("checked", true);
      // console.log(JSON.stringify("Turned Off", null, 3));
  } else if (InitialSlider == "2") {
      $("#automatic").prop("checked", true);
      // console.log(JSON.stringify("Turned Auto", null, 3));
  } else if (InitialSlider == "3") {
      $("#on").prop("checked", true);
      // console.log(JSON.stringify("Turned On", null, 3));
  }
  });

 };


// if (err) console.log(err, err.stack); // an error occurred
// else{
//     var xAxisTime = [];
//     var yAxisTemp = [];
//     data.Items.forEach(function(item) {
//         xAxisTime.push(item.Date.toString());
//         yAxisTemp.push(item.temp.toString());
//     });
// //Chart.js code
// var lineChartData = {
//     labels : recentEventsDateTime,
//     datasets : [
//     {
//         label: "JustGiving Pages Views",
//         fillColor : "rgba(151,187,205,0.2)",
//         strokeColor : "rgba(151,187,205,1)",
//         pointColor : "rgba(151,187,205,1)",
//         pointStrokeColor : "#fff",
//         pointHighlightFill : "#fff",
//         pointHighlightStroke : "rgba(151,187,205,1)",
//         data : recentEventsCounter
//      }
//     ]}




