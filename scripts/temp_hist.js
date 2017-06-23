	/**
	@class temp_hist
	@constructor
	*/

  temp_hist = function (pageCfg) {
		this.$graphCont = pageCfg.$graphCont;
		this.$rangeBtnsCont = pageCfg.$rangeBtnsCont;
	  this.graphDataProvider = new GraphDataProvider();
	  this.graphDataProvider.newGraphDataCallbacks.add($.proxy(this._onNewGraphData, this));
    		this.isRangeSelectorActive = false;
  };

  /**
   * Starts everything by requesting initial data load. For example's purposes, initial date extents are hardcoded.
   *
   * @method
   */
  temp_hist.prototype.init = function () {
    this.showSpinner(true);

    this._setupRangeButtons();

    // Default range dates
    var rangeEndMom = moment().utc();
    rangeEndMom.startOf('hour');
    rangeEndMom.add(1, 'hour');
    var rangeStartMom = moment.utc(rangeEndMom).add(-6, 'month');

    this.$rangeBtnsCont.find("button[name='range-btn-1w']").addClass('active');

    // Default detail dates
    var detailEndMom = moment(rangeEndMom);
    // detailEndMom.add(3, 'day');
    var detailStartMom = moment(detailEndMom);
    detailStartMom.add(-1, 'week');

    this.graphDataProvider.loadData("Series-A", rangeStartMom.toDate(), rangeEndMom.toDate(), detailStartMom.toDate(), detailEndMom.toDate(), this.$graphCont.width());

  };

  temp_hist.prototype._setupRangeButtons = function () {
    var self = this;

    this.$rangeBtnsCont.children().on('click', function (evt) {
      evt.preventDefault();
      var rangeType = evt.target.name.toString().replace("range-btn-", "");

      self.$rangeBtnsCont.children().removeClass('active');

      $(this).addClass('active');

      var rangeEndMom;
      rangeEndMom = moment().utc();
      rangeEndMom.minutes(0).seconds(0);
      rangeEndMom.add(1, 'hour');

      //console.log("rangeType", rangeType);

      var rangeStartMom;
      if (rangeType == "1d") {
        rangeStartMom = moment.utc(rangeEndMom).add(-1, 'day');
      } else if (rangeType == "1w") {
        rangeStartMom = moment.utc(rangeEndMom).add(-1, 'week');
      } else if (rangeType == "1m") {
        rangeStartMom = moment.utc(rangeEndMom).add(-1, 'month');
      } else if (rangeType == "6m") {
        rangeStartMom = moment.utc(rangeEndMom).add(-6, 'month');
      } else if (rangeType == "1y") {
        rangeStartMom = moment.utc(rangeEndMom).add(-1, 'year');
      } else if (rangeType == "5y") {
        rangeStartMom = moment.utc(rangeEndMom).add(-5, 'year');
      } else if (rangeType == "ytd") {
        rangeStartMom = moment().startOf('year').utc();
      }


      //For demo purposes, when range is reset, auto reset detail view to same extents as range
      var detailStartMom = rangeStartMom.clone();
      var detailEndMom = rangeEndMom.clone();

      self.showSpinner(true);
      self.graphDataProvider.loadData("Series-A",
                                      rangeStartMom.toDate(),
                                      rangeEndMom.toDate(),
                                      detailStartMom.toDate(),
                                      detailEndMom.toDate(),
                                      self.$graphCont.width());

    });

  };

  /**
   * Internal method to add mouse down listener to dygraphs range selector.  Coded so that it can be called
   * multiple times without concern. Although not necessary for simple example (like example1), this becomes necessary
   * for more advanced examples when the graph must be recreated, not just updated.
   *
   * @method _setupRangeMouseHandling
   * @private
   */
  temp_hist.prototype._setupRangeMouseHandling = function () {
    var self = this;

    // Element used for tracking mouse up events
    this.$mouseUpEventEl = $(window);
    if ($.support.cssFloat == false) { //IE<=8, doesn't support mouse events on window
      this.$mouseUpEventEl = $(document.body);
    }

    //Minor Hack...not sure how else to hook-in to dygraphs range selector events without modifying source. This is
    //where minor modification to dygraphs (range selector plugin) might make for a cleaner approach.
    //We only want to install a mouse up handler if mouse down interaction is started on the range control
    var $rangeEl = this.$graphCont.find('.dygraph-rangesel-fgcanvas, .dygraph-rangesel-zoomhandle');

    //Uninstall existing handler if already installed
    $rangeEl.off("mousedown.jgs touchstart.jgs");

    //Install new mouse down handler
    $rangeEl.on("mousedown.jgs touchstart.jgs", function (evt) {

      //Track that mouse is down on range selector
      self.isRangeSelectorActive = true;

      // Setup mouse up handler to initiate new data load
      self.$mouseUpEventEl.off("mouseup.jgs touchend.jgs"); //cancel any existing
      $(self.$mouseUpEventEl).on('mouseup.jgs touchend.jgs', function (evt) {
        self.$mouseUpEventEl.off("mouseup.jgs touchend.jgs");

        //Mouse no longer down on range selector
        self.isRangeSelectorActive = false;

        //Get the new detail window extents
        var graphAxisX = self.graph.xAxisRange();
        self.detailStartDateTm = new Date(graphAxisX[0]);
        self.detailEndDateTm = new Date(graphAxisX[1]);

        // Load new detail data
        self._loadNewDetailData();
      });

    });


  };

  /**
   * Internal method that provides a hook in to Dygraphs default pan interaction handling.  This is a bit of hack
   * and relies on Dygraphs' internals. Without this, pan interactions (holding SHIFT and dragging graph) do not result
   * in detail data being loaded.
   *
   * This method works by replacing the global Dygraph.Interaction.endPan method.  The replacement method
   * is global to all instances of this class, and so it can not rely on "self" scope.  To support muliple graphs
   * with their own pan interactions, we keep a circular reference to this object instance on the dygraphs instance
   * itself when creating it. This allows us to look up the correct page object instance when the endPan callback is
   * triggered. We use a global JGS.Demo3Page.isGlobalPanInteractionHandlerInstalled flag to make sure we only install
   * the global handler once.
   *
   * @method _setupPanInteractionHandling
   * @private
   */
  temp_hist.prototype._setupPanInteractionHandling = function () {

    if (temp_hist.isGlobalPanInteractionHandlerInstalled)
      return;
    else
      temp_hist.isGlobalPanInteractionHandlerInstalled = true;

    //Save original endPan function
    var origEndPan = Dygraph.Interaction.endPan;

    //Replace built-in handling with our own function
    Dygraph.Interaction.endPan = function(event, g, context) {

      var myInstance = g.demoPageInstance;

      //Call the original to let it do it's magic
      origEndPan(event,g,context);

      //Extract new start/end from the x-axis

      //Note that this _might_ not work as is in IE8. If not, might require a setTimeout hack that executes these
      //next few lines after a few ms delay. Have not tested with IE8 yet.
      var axisX = g.xAxisRange();
      myInstance.detailStartDateTm = new Date(axisX[0]);
      myInstance.detailEndDateTm = new Date(axisX[1]);

      //Trigger new detail load
      myInstance._loadNewDetailData();
    };
    Dygraph.endPan = Dygraph.Interaction.endPan; //see dygraph-interaction-model.js
  };



  /**
   * Initiates detail data load request using last known zoom extents
   *
   * @method _loadNewDetailData
   * @private
   */
  temp_hist.prototype._loadNewDetailData = function () {
    this.showSpinner(true);
    this.graphDataProvider.loadData("Series-A", null, null, this.detailStartDateTm, this.detailEndDateTm, this.$graphCont.width());
  };

  /**
   * Callback handler when new graph data is available to be drawn
   *
   * @param graphData
   * @method _onNewGraphData
   * @private
   */
  temp_hist.prototype._onNewGraphData = function (graphData) {
    this.drawDygraph(graphData);
	  // console.log(graphData.dyData);
    this.$rangeBtnsCont.css('visibility', 'visible');
    this.showSpinner(false);

  };

		// var x = 74.25;
		// var y = 65.96;
		// var z = 83.64;
		// var dyData = [];
		// dyData.push([new Date("2017/06/18 16:00:20"), (z)]);
		// dyData.push([new Date("2017/06/19 10:00:50"), (y)]);	
		// dyData.push([new Date("2017/06/20 12:00:40"), (x)]);
		// var graphData = {
			// dyData: dyData,
			// detailStartDateTm: new Date("2017/06/18 16:00:00"),
			// detailEndDateTm: new Date("2017/06/20 12:00:00")
		// };
		// console.log(graphData.dyData);

		temp_hist.prototype.drawDygraph = function (graphData) {
			var dyData = graphData.dyData;

		var detailStartDateTm = graphData.detailStartDateTm;
		var detailEndDateTm = graphData.detailEndDateTm;
		var recreateDygraph = false;
		var labels = ["time", "Series-A"];

		var useAutoRange = true;
		var expectMinMax = true;

		var axes = {};
		if (useAutoRange) {
			axes.y = {valueRange: null};
		} else {
			axes.y = {valueRange: [40, 100]};
		}
		

		if (!this.graph || recreateDygraph) {
			var graphCfg = {
				axes: axes,
				labels: labels,
				showRangeSelector: false,
				// interactionModel: Dygraph.Interaction.defaultModel,
				connectSeparatedPoints: true,
				dateWindow: [detailStartDateTm.getTime(), detailEndDateTm.getTime()],
				// drawCallback: $.proxy(this._onDyDrawCallback, this),
				zoomCallback: $.proxy(this._onDyZoomCallback, this),
				digitsAfterDecimal: 2,
				// labelsDivWidth: "275"
			};

			this.graph = new Dygraph(this.$graphCont.get(0), dyData, graphCfg);
			this._setupRangeMouseHandling();
			this._setupPanInteractionHandling();

			this.graph.demoPageInstance = this;
		
		}

		else {
			var graphCfg = {
				axes: axes,
				labels: labels,
				file: dyData,

				dateWindow: [detailStartDateTm.getTime(), detailEndDateTm.getTime()],
			};
			this.graph.updateOptions(graphCfg);
		}
	};

  temp_hist.prototype._onDyZoomCallback = function (minDate, maxDate, yRanges) {
    //console.log("_onDyZoomCallback");

    if (this.graph == null)
      return;

    this.detailStartDateTm = new Date(minDate);
    this.detailEndDateTm = new Date(maxDate);

    //When zoom reset via double-click, there is no mouse-up event in chrome (maybe a bug?),
    //so we initiate data load directly
    if (this.graph.isZoomed('x') === false) {
      this.$mouseUpEventEl.off("mouseup.jgs touchend.jgs"); //Cancel current event handler if any
      this._loadNewDetailData();
      return;
    }

    //Check if need to do IE8 workaround
    if ($.support.cssFloat == false) { //IE<=8
      // ie8 calls drawCallback with new dates before zoom. This example currently does not implement the
      // drawCallback, so this example might not work in IE8 currently. This next line _might_ solve, but will
      // result in duplicate loading when drawCallback is added back in.
      this._loadNewDetailData();
      return;
    }

    //The zoom callback is called when zooming via mouse drag on graph area, as well as when
    //dragging the range selector bars. We only want to initiate dataload when mouse-drag zooming. The mouse
    //up handler takes care of loading data when dragging range selector bars.
    var doDataLoad = !this.isRangeSelectorActive;
    if (doDataLoad === true)
      this._loadNewDetailData();

  }; 
 		
   temp_hist.prototype.showSpinner = function (show) {
    if (show === true) {

      var target = this.$graphCont.get(0);

      if (this.spinner == null) {
        var opts = {
          lines: 13, // The number of lines to draw
          length: 7, // The length of each line
          width: 6, // The line thickness
          radius: 10, // The radius of the inner circle
          corners: 1, // Corner roundness (0..1)
          rotate: 0, // The rotation offset
          color: '#000', // #rgb or #rrggbb
          speed: 1, // Rounds per second
          trail: 60, // Afterglow percentage
          shadow: false, // Whether to render a shadow
          hwaccel: false, // Whether to use hardware acceleration
          className: 'spinner', // The CSS class to assign to the spinner
          zIndex: 2e9 // The z-index (defaults to 2000000000)
        };

        this.spinner = new Spinner(opts);
        this.spinner.spin(target);
        this.spinnerIsSpinning = true;
      } else {
        if (this.spinnerIsSpinning === false) { //else already spinning
          this.spinner.spin(target);
          this.spinnerIsSpinning = true;
        }
      }
    } else if (this.spinner != null && show === false) {
      this.spinner.stop();
      this.spinnerIsSpinning = false;
    }

  };

