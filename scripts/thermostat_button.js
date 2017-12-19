
  thermostat_button = function (pageCfg) {
		this.$rangeBtnsCont = pageCfg.$rangeBtnsCont;
		this.$setpointBtnsCont = pageCfg.$setpointBtnsCont;
  }

	  thermostat_button.prototype.init = function() {

		  var that = this;
		  
		  this._setupButtons();

		// AWS.config.region = 'us-west-1'; // Region
		// var dynamodb = new dynamo.DocumentClient();
		
		var paramsInitializeSlider = {
		    TableName: 'HeaterManualState',
		    KeyConditionExpression: "Id = :resourceFromSite",
		    ExpressionAttributeValues: {
			":resourceFromSite": {
				S: "Thermostat_01"
			}
		    }
		};

		var InitialSlider;
		var InitialSetpoint;	
		  var thermoquerytryflag = true;
function thermoquery(params) {
dynamodb.query(params, function(err, data) {
		      if (err) {
			if (refreshCredentials() && thermoqueryflag) {
				thermoquerytryflag = false;
				thermoquery(params);
				return;
			}
			console.log(JSON.stringify(err, null, 3));
		      }
		      else
			thermoquerytryflag = true;
		      data.Items.forEach(function(item) {
			InitialSlider = item.HeaterState.S;
			InitialSetpoint = item.HeaterSetpoint.N;
			  });

		  var $Set = that.$setpointBtnsCont.find("#setpoint");
		  $Set.prop('textContent',InitialSetpoint);

		  if (InitialSlider == "1") {
			  
			  var $btnInput = that.$rangeBtnsCont.find("#off");
			  $btnInput.addClass('active');

		      // $("#off").prop("checked", true);
		    // that.$rangeBtnsCont.find(":radio[name='off']").checked = true;
		      //console.log(JSON.stringify("Turned Off", null, 3));
			 
		  } else if (InitialSlider == "2") {
			  
			  var $btnInput = that.$rangeBtnsCont.find("#auto");
			  $btnInput.addClass('active');
			  
		      // $("#automatic").prop("checked", true);
		    // that.$rangeBtnsCont.find("label[name='auto']").prop("checked", true);
		      //console.log(JSON.stringify("Turned Auto", null, 3));
			  
		  } else if (InitialSlider == "3") {
			  
			  var $btnInput = that.$rangeBtnsCont.find("#on");
			  $btnInput.addClass('active');

		      // $("#on").prop("checked", true);
		    // that.$rangeBtnsCont.find("label[name='on']").prop("checked", true);
		      //console.log(JSON.stringify("Turned On", null, 3));

		  }

		//       console.log(JSON.stringify(InitialSlider, null, 3));
		  });
}

if (dynamodb != null) {
	thermoquery(paramsInitializeSlider);
		  } else {
			  var $btnInput = that.$rangeBtnsCont.find("#auto");
			  $btnInput.addClass('active');
}	

		}
	
	thermostat_button.prototype._setupButtons = function () {

	var that = this;

		// AWS.config.region = 'us-west-1'; // Region
		// var dynamodb = new dynamo.DocumentClient();

		var Setpoint;
		var setpointString; 

		var paramsOnUpdate = {
		    TableName: 'HeaterManualState',
		    Key: {
		      "Id": {
			      S: "Thermostat_01"
		      },
		      "Date": {
			      N: "1"
		      }
		    },
		    UpdateExpression: "SET HeaterState = :resourceFromSite",
		    ExpressionAttributeValues: {
			":resourceFromSite": {
				S: "3"
			}
		    },
		    ReturnValues: "ALL_NEW"
		};

		var paramsAutoUpdate = {
		    TableName: 'HeaterManualState',
		    Key: {
		      "Id": {
			      S: "Thermostat_01"
		      },
		      "Date": {
			      N: "1"
		      }
		    },
		    UpdateExpression: "SET HeaterState = :resourceFromSite",
		    ExpressionAttributeValues: {
			":resourceFromSite": {
				S: "2"
			}
		    },
		    ReturnValues: "ALL_NEW"
		};

		var paramsOffUpdate = {
		    TableName: 'HeaterManualState',
		    Key: {
		      "Id": {
			      S: "Thermostat_01"
		      },
		      "Date": {
			      N: "1"
		      }
		    },
		    UpdateExpression: "SET HeaterState = :resourceFromSite",
		    ExpressionAttributeValues: {
			":resourceFromSite": {
				S: "1"
			}
		    },
		    ReturnValues: "ALL_NEW"
		};


		this.$rangeBtnsCont.children().on('click', function (evt) {
			evt.preventDefault();
			  var rangeType = evt.target.id.toString();
			that.$rangeBtnsCont.children().removeClass('active');
			$(this).addClass('active');
			
if (dynamodb != null) {
var updateitemtryflag = true;
			if (rangeType == "off") {

				dynamoupdateitem(paramsOffUpdate);
				sendtopic = "Thermostat_01/settings/radio";
				msgcontent = "1";	
            	$.event.trigger({type: "triggerIoT"});

			} else if (rangeType == "auto") {

				dynamoupdateitem(paramsAutoUpdate);
				sendtopic = "Thermostat_01/settings/radio";
				msgcontent = "2";	
            	$.event.trigger({type: "triggerIoT"});
			
			} else if (rangeType == "on") {

				dynamoupdateitem(paramsOnUpdate);
				sendtopic = "Thermostat_01/settings/radio";
				msgcontent = "3";	
            	$.event.trigger({type: "triggerIoT"});
			} 
}
function dynamoupdateitem (paramsUpdate) {
	dynamodb.updateItem(paramsUpdate, function(err, data) {
		if (err) {
			if (refreshCredentials() && updateitemtryflag) {
				updateitemtryflag = false;
				dynamoupdateitem(paramsUpdate);
				return;
			}
			console.log(JSON.stringify(err, null, 2));
		}
		else
			updateitemtryflag = true;
			console.log(JSON.stringify(data, null, 2));
	});
}
		});

		this.$setpointBtnsCont.children().on('click', function (evt2) {
			evt2.preventDefault();
			  var rangeType = evt2.target.id.toString();
			that.$setpointBtnsCont.children().removeClass('active');
			$(this).addClass('active');
			
if (dynamodb != null) {
var updateitemtryflag = true;
		if (rangeType == "up") {
			Setpoint = parseInt(that.$setpointBtnsCont.find("#setpoint").prop('textContent')) + 1;
			that.$setpointBtnsCont.find("#setpoint").prop('textContent', Setpoint);
			setpointString = Setpoint.toString();
		var paramsUpUpdate = {
		    TableName: 'HeaterManualState',
		    Key: {
		      "Id": {
			      S: "Thermostat_01"
		      },
		      "Date": {
			      N: "1"
		      }
		    },
		    UpdateExpression: "SET HeaterSetpoint = :resourceFromSite",
		    ExpressionAttributeValues: {
			":resourceFromSite": {
				N: setpointString
			}
		    },
			ReturnValues: "ALL_NEW"
		};
			dynamoupdateitem(paramsUpUpdate);
			sendtopic = "Thermostat_01/settings/setpoint";
			msgcontent = setpointString;	
			$.event.trigger({type: "triggerIoT"});

		} else if (rangeType == "down") {
			Setpoint = parseInt(that.$setpointBtnsCont.find("#setpoint").prop('textContent')) - 1;
			that.$setpointBtnsCont.find("#setpoint").prop('textContent', Setpoint);	
			setpointString = Setpoint.toString();
		var paramsDownUpdate = {
		    TableName: 'HeaterManualState',
		    Key: {
		      "Id": {
			      S: "Thermostat_01"
		      },
		      "Date": {
			      N: "1"
		      }
		    },
		    UpdateExpression: "SET HeaterSetpoint = :resourceFromSite",
		    ExpressionAttributeValues: {
			":resourceFromSite": {
				N: setpointString
			}
		    },
		    ReturnValues: "ALL_NEW"
		};
			dynamoupdateitem(paramsDownUpdate);
			sendtopic = "Thermostat_01/settings/setpoint";
			msgcontent = setpointString;	
			$.event.trigger({type: "triggerIoT"});
		}
} else {
	if (rangeType == "up") {
			Setpoint = parseInt(that.$setpointBtnsCont.find("#setpoint").prop('textContent')) + 1;
		that.$setpointBtnsCont.find("#setpoint").prop('textContent', Setpoint);	
	} else if (rangeType == "down") {
			Setpoint = parseInt(that.$setpointBtnsCont.find("#setpoint").prop('textContent')) - 1;
		that.$setpointBtnsCont.find("#setpoint").prop('textContent', Setpoint);
	}
}
function dynamoupdateitem (paramsUpdate) {
	dynamodb.updateItem(paramsUpdate, function(err, data) {
		if (err) {
			if (refreshCredentials() && updateitemtryflag) {
				updateitemtryflag = false;
				dynamoupdateitem(paramsUpdate);
				return;
			}
			console.log(JSON.stringify(err, null, 2));
		}
		else
			updateitemtryflag = true;
			console.log(JSON.stringify(data, null, 2));
	});
}
		});

	}



