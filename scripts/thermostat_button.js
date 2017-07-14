
  thermostat_button = function (pageCfg) {
		this.$rangeBtnsCont = pageCfg.$rangeBtnsCont;
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
				S: "Website"
			}
		    }
		};

		var InitialSlider;	
if (dynamodb != null) {
		  dynamodb.query(paramsInitializeSlider, function(err, data) {
		      if (err)
			console.log(JSON.stringify(err, null, 3));
		      else
		      data.Items.forEach(function(item) {
			InitialSlider = item.WebsiteHeaterState.S;
		      });
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
} else {
			  var $btnInput = that.$rangeBtnsCont.find("#auto");
			  $btnInput.addClass('active');
}	

		}
	
	thermostat_button.prototype._setupButtons = function () {

	var that = this;

		// AWS.config.region = 'us-west-1'; // Region
		// var dynamodb = new dynamo.DocumentClient();

		var paramsOnUpdate = {
		    TableName: 'HeaterManualState',
		    Key: {
		      "Id": {
			      S: "Website"
		      },
		      "Date": {
			      N: "1"
		      }
		    },
		    UpdateExpression: "SET WebsiteHeaterState = :resourceFromSite",
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
			      S: "Website"
		      },
		      "Date": {
			      N: "1"
		      }
		    },
		    UpdateExpression: "SET WebsiteHeaterState = :resourceFromSite",
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
			      S: "Website"
		      },
		      "Date": {
			      N: "1"
		      }
		    },
		    UpdateExpression: "SET WebsiteHeaterState = :resourceFromSite",
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
			if (rangeType == "off") {

			 dynamodb.updateItem(paramsOffUpdate, function(err, data) {
			    if (err)
				console.log(JSON.stringify(err, null, 2));
			    else
				console.log(JSON.stringify(data, null, 2));
			});
					
			} else if (rangeType == "auto") {

			 dynamodb.updateItem(paramsAutoUpdate, function(err, data) {
			    if (err)
				console.log(JSON.stringify(err, null, 2));
			    else
				console.log(JSON.stringify(data, null, 2));
			});

			
			} else if (rangeType == "on") {

			 dynamodb.updateItem(paramsOnUpdate, function(err, data) {
			    if (err)
				console.log(JSON.stringify(err, null, 2));
			    else
				console.log(JSON.stringify(data, null, 2));
			});
			}
}
		});
	}



