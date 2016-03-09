$(function() {
	
	var showRoom = {

		init: function () {
			this.bindEvents();
			this.getDimensions();
			this.getImages(); 
		},

		selectors: {
			grid: '[data-grid-container]',
			row: '[data-row]',
			item: '[data-item]',
			split: '[data-split-item]'
		},

		bindEvents: function () {
				
			$(window).on('resize', this.getDimensions.bind(this));

		},

		getImages: function () {
		    	
	    	var self = this;

		    //Flickr Integration
		    $.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?id=11129938@N02&lang=en-us&format=json&jsoncallback=?", function(data) {
		        
		    	if (data.items && data.items.length > 0) {
		    		self.renderImages(data);
		    	} else {
		    		alert('Error with API.');
		    	}

		    });

		},

		renderImages: function (data) {
			
			var $gridContainer = $(this.selectors.grid),
				$splits = $gridContainer.find(this.selectors.split);

			$.each(data.items, function(i, item) {
				if (i < 18) {
					$($splits[i]).css("background-image","url(" + item.media.m + ")");
				} else {
					return;
				}
			});

		},

		getDimensions: function () {

			var docEle = document.documentElement;

			var dimensions = {
				rowWidth: docEle.clientWidth,
				rowHeight: docEle.clientHeight / 3,
				itemWidth: docEle.clientWidth / 3,
				itemHeight: docEle.clientHeight / 3,
				splitWidth: (docEle.clientWidth / 3) / 2,
				splitHeight: docEle.clientHeight / 3
			};

			this.setDimensions(dimensions);

		},

		setDimensions: function (dimensions) {

			var $gridContainer = $(this.selectors.grid),
				$rows = $gridContainer.find(this.selectors.row),
				$items = $gridContainer.find(this.selectors.item),
				$splits = $gridContainer.find(this.selectors.split);

			$rows.css({
				width: dimensions.rowWidth,
				height: dimensions.rowHeight
			});
			
			$items.css({
				width: dimensions.itemWidth,
				height: dimensions.itemHeight
			});
			
			$splits.css({
				width: dimensions.splitWidth,
				height: dimensions.splitHeight
			});

		}

	}

	showRoom.init();

});





