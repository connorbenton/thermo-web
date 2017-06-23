
  thermostat_button = function (pageCfg) {
		this.$rangeBtnsCont = pageCfg.$rangeBtnsCont;
  }

	  thermostat_button.prototype.init = function() {

		  var that = this;

		AWS.config.update({ accessKeyId: 'AKIAIFUKTLKXUMSVHXSA',
                secretAccessKey: '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' });
		AWS.config.region = 'us-west-1'; // Region
		var dynamodb = new AWS.DynamoDB.DocumentClient();
		
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
		var InitialSlider;	
		  dynamodb.query(paramsInitializeSlider, function(err, data) {
		      if (err)
			console.log(JSON.stringify(err, null, 3));
		      else
		      data.Items.forEach(function(item) {
			InitialSlider = item.WebsiteHeaterState;
		      });
		  if (InitialSlider == "1") {
			  
			  var $btnInput = that.$rangeBtnsCont.find("#off");
			  $btnInput.parent('.btn').addClass('active');

		      // $("#off").prop("checked", true);
		    // that.$rangeBtnsCont.find(":radio[name='off']").checked = true;
		      //console.log(JSON.stringify("Turned Off", null, 3));
			 
		  } else if (InitialSlider == "2") {
			  
			  var $btnInput = that.$rangeBtnsCont.find("#auto");
			  $btnInput.parent('.btn').addClass('active');
			  
		      // $("#automatic").prop("checked", true);
		    // that.$rangeBtnsCont.find("label[name='auto']").prop("checked", true);
		      //console.log(JSON.stringify("Turned Auto", null, 3));
			  
		  } else if (InitialSlider == "3") {
			  
			  var $btnInput = that.$rangeBtnsCont.find("#on");
			  $btnInput.parent('.btn').addClass('active');

		      // $("#on").prop("checked", true);
		    // that.$rangeBtnsCont.find("label[name='on']").prop("checked", true);
		      //console.log(JSON.stringify("Turned On", null, 3));

		  }

		//       console.log(JSON.stringify(InitialSlider, null, 3));
		  });
		}

