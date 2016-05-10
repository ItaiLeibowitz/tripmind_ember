
var gmaps = {};
	
	
(function() {
	// === Styles

	var styles = {};
	styles.originalStyles = new Array(10),
		styles.originalStyles[0] = [
			{
				"featureType": "road",
				"stylers": [
					{ "visibility": "off" }
				]
			},
			{
				"featureType": "landscape.natural",
				"stylers": [
					{ "visibility": "off" }
				]
			},
			{
				"featureType": "poi",
				"stylers": [
					{ "visibility": "off" }
				]
			},
			{
				"featureType": "landscape",
				"elementType": "geometry",
				"stylers": [
					{ "visibility": "on" },
					{ "color": "#f6f0e5" }
				]
			},
			{
				"featureType": "administrative.locality",
				"stylers": [
					{ "visibility": "off" }
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{ "color": "#aed6f4" }
				]
			},
			{
				"featureType": "administrative.province",
				"stylers": [
					{ "visibility": "off" }
				]
			},
			{
				"featureType": "administrative.country",
				"elementType": "geometry",
				"stylers": [
					{ "weight": 1.3 },
					{ "color": "#b7b5aa" }
				]
			}
		];
	styles.originalStyles[1] = styles.originalStyles[0].slice(0);
	/*styles.originalStyles[1].push({
	 "featureType": "administrative.locality",
	 "stylers": [
	 { "visibility": "on" },
	 { "gamma": 2.88 }
	 ]
	 });*/
	styles.originalStyles[2] = styles.originalStyles[0].slice(0);
	styles.originalStyles[2].push({
		"featureType": "administrative.locality",
		"stylers": [
			{ "visibility": "on" },
			{ "gamma": 2.88 }
		]
	}, {
		"featureType": "poi.park",
		"elementType": "geometry",
		"stylers": [
			{ "visibility": "on" },
			{ "gamma": 2.50 }
		]
	});
	styles.originalStyles[3] = styles.originalStyles[2].slice(0);
	styles.originalStyles[3].push({
		"featureType": "road.highway",
		"stylers": [
			{ "visibility": "on" },
			{ "weight": 0.5 },
			{ "saturation": -100 },
			{ "gamma": 3.31 }
		]
	}, {
		"featureType": "poi.park",
		"elementType": "geometry",
		"stylers": [
			{ "visibility": "on" },
			{ "gamma": 0.8 }
		]
	});
	styles.originalStyles[4] = styles.originalStyles[3].slice(0);
	styles.originalStyles[4].push({
		"featureType": "landscape.natural.terrain",
		"stylers": [
			{ "visibility": "on" }
		]
	}, {
		"featureType": "poi.park",
		"elementType": "geometry",
		"stylers": [
			{ "visibility": "on" },
			{ "gamma": 0.5 }
		]
	});
	styles.originalStyles[5] = styles.originalStyles[2].slice(0);
	styles.originalStyles[5].push({
		"featureType": "road.highway",
		"stylers": [
			{ "visibility": "on" },
			{ "gamma": 2.03 }
		]
	}, {
		"featureType": "landscape.natural.terrain",
		"stylers": [
			{ "visibility": "on" }
		]
	}, {
		"featureType": "road",
		"stylers": [
			{ "visibility": "on" },
			{ "saturation": -60 }
		]
	}, {
		"featureType": "poi.park",
		"elementType": "geometry",
		"stylers": [
			{ "visibility": "on" },
			{ "gamma": 0.4 }
		]

	});
	styles.originalStyles[6] = styles.originalStyles[2].slice(0);
	styles.originalStyles[6].push({
		"featureType": "administrative.locality",
		"stylers": [
			{ "visibility": "on" },
			{ "gamma": 0.3 }
		]
	}, { "featureType": "road.highway",
		"stylers": [
			{ "visibility": "on" },
			{ "gamma": 2.03 }
		]
	}, {
		"featureType": "landscape.natural.terrain",
		"stylers": [
			{ "visibility": "on" }
		]
	}, {
		"featureType": "road",
		"stylers": [
			{ "visibility": "on" },
			{ "saturation": -20 }
		]
	}, {
		"featureType": "poi.park",
		"elementType": "geometry",
		"stylers": [
			{ "visibility": "on" },
			{ "gamma": 0.4 }
		]
	});
	styles.originalStyles[7] = styles.originalStyles[6].slice(0);
	/*styles.originalStyles[7].push({
	 "featureType": "administrative.locality",
	 "stylers": [
	 { "visibility": "on" },
	 { "gamma": 0.3 }
	 ]
	 });*/
	styles.originalStyles[8] = styles.originalStyles[7].slice(0);
	styles.originalStyles[8].push({
		"featureType": "transit",
		"stylers": [
			{ "visibility": "simplified" }
		]
	});
	styles.originalStyles[9] = styles.originalStyles[7].slice(0);
	styles.originalStyles[9].push({
		"featureType": "transit",
		"stylers": [
			{ "visibility": "on" }
		]
	});

	var stylesByZoomLevel = [
		0, //0
		0, //1
		0, //2
		1, //3
		2, //4
		2, //5
		2, //6
		2, //7
		3, //8
		4, //9
		5, //10
		6, //11
		7, //12
		8, //13
		8, //14
		9, //15
		9, //16
		9, //17
		9, //18
		9 //19
	];

	// === End of styles

	// === Marker Icons

	function createMarkerIcons() {
		var markerIconDot = {
			url: '/assets/images/1x1-pixel.png',
			size: new google.maps.Size(1, 1),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(4, 4),
			scaledSize: null
		};

		var markerIconSmallRed = {
			url: '/assets/images/markers4.png',
			size: new google.maps.Size(16, 16),
			origin: new google.maps.Point(8, 85),
			anchor: new google.maps.Point(8, 12),
			scaledSize: null
		};

		var markerIconLargeRed = {
			url: '/assets/images/markers4.png',
			size: new google.maps.Size(20, 28),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(10, 24),
			scaledSize: new google.maps.Size(100, 66)
		};

		var markerIconInvisRed = {
			url: '/assets/images/picture1.png',
			size: new google.maps.Size(220, 230),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(3, 158)
		};

		var markerIconLargeRedMain = {
			url: '/assets/images/markers4.png',
			size: new google.maps.Size(20, 28),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(10, 24),
			scaledSize: new google.maps.Size(100, 66)
		};

		var markerIconSmallBlue = {

		};

		var markerIconLargeBlue = {
			url: '/assets/images/markers4.png',
			size: new google.maps.Size(20, 28),
			origin: new google.maps.Point(27, 0),
			anchor: new google.maps.Point(9, 24),
			scaledSize: new google.maps.Size(100, 66)
		};

		var markerIconSmallGreen = {

		};

		var markerIconLargeGreen = {
			url: '/assets/images/markers4.png',
			size: new google.maps.Size(20, 28),
			origin: new google.maps.Point(54, 0),
			anchor: new google.maps.Point(8, 24),
			scaledSize: new google.maps.Size(100, 66)
		};

		var markerIconSmallOrange = {
			url: '/assets/images/markers4.png',
			size: new google.maps.Size(16, 16),
			origin: new google.maps.Point(126, 85),
			anchor: new google.maps.Point(8, 12),
			scaledSize: null
		};

		var markerIconLargeOrange = {
			url: '/assets/images/markers4.png',
			size: new google.maps.Size(20, 28),
			origin: new google.maps.Point(81, 0),
			anchor: new google.maps.Point(8, 24),
			scaledSize: new google.maps.Size(100, 66)
		};

		return {
			dot: markerIconDot,
			smallRed: markerIconSmallRed,
			invisRed: markerIconInvisRed,
			smallBlue: markerIconSmallBlue,
			smallGreen: markerIconSmallGreen,
			smallOrange: markerIconSmallOrange,
			largeRed: markerIconLargeRed,
			largeRedMain: markerIconLargeRedMain,
			largeBlue: markerIconLargeBlue,
			largeGreen: markerIconLargeGreen,
			largeOrange: markerIconLargeOrange,
		};
	};

	// === End of Marker Icons

	// === Polyline options

	function createPolylineOptions(primaryColor, secondaryColor) {

		var polylineStrokeOptions = {
			strokeColor: primaryColor,
			strokeOpacity: 0.8,
			strokeWeight: 6
		};
		var polylineHighlightStrokeOptions = {
			strokeColor: secondaryColor,
			strokeOpacity: 1,
			strokeWeight: 8
		};

		var defaultFlightIconOptions = {
			offset: '0',
			repeat: '20px',
		};
		var defaultWalkingIconOptions = {
			offset: '0',
			repeat: '15px',
		};

		var defaultFlightIcon = {
			path: 'M 0,-1 0,1',
			scale: 4
		};
		var defaultWalkingIcon = {
			path: google.maps.SymbolPath.CIRCLE,
			scale: 2
		};

		var defaultFlightPolylineOptions = {
			geodesic: true,
			strokeOpacity: 0,
		};
		var defaultWalkingPolylineOptions = {
			geodesic: false,
			strokeOpacity: 0,
		};

		var flightIcon = $.extend({}, { icon: $.extend({}, defaultFlightIcon, polylineStrokeOptions) }, defaultFlightIconOptions);
		var highlightFlightIcon = $.extend({}, { icon: $.extend({}, defaultFlightIcon, polylineHighlightStrokeOptions) }, defaultFlightIconOptions);

		var polylineFlightOptions = $.extend({}, defaultFlightPolylineOptions, { icons: [flightIcon] });
		var polylineHighlightFlightOptions = $.extend({}, defaultFlightPolylineOptions, { icons: [highlightFlightIcon] });

		var walkingIcon = $.extend({}, { icon: $.extend({}, defaultWalkingIcon, polylineStrokeOptions) }, defaultWalkingIconOptions);
		var highlightWalkingIcon = $.extend({}, { icon: $.extend({}, defaultWalkingIcon, polylineHighlightStrokeOptions) }, defaultWalkingIconOptions);

		var polylineWalkingOptions = $.extend({}, defaultWalkingPolylineOptions, { icons: [walkingIcon] });
		var polylineHighlightWalkingOptions = $.extend({}, defaultWalkingPolylineOptions, { icons: [highlightWalkingIcon] });

		return {
			default: polylineStrokeOptions,
			highlight: polylineHighlightStrokeOptions,
			flight: polylineFlightOptions,
			highlightFlight: polylineHighlightFlightOptions,
			walking: polylineWalkingOptions,
			highlightWalking: polylineHighlightWalkingOptions
		}
	};

	// === End of Polyline options

	// === Custom control

	/** @constructor */

		// === End of Custom control

		// === Init

		// Init options that don't require the map
	gmaps = $.extend(gmaps, {
		styles: styles,
		stylesByZoomLevel: stylesByZoomLevel,
		markerIcons: createMarkerIcons(),
		polylineOptions: createPolylineOptions('#7CCC34', '#00aa55'),
		createPolylineOptions: createPolylineOptions,
		polylineAlternateOptions: createPolylineOptions('#5ba0d0', '#0078b4'),
		directionsDisplayOptions: {
			suppressMarkers: true,
			preserveViewport: true,
			/*polylineOptions: {
				strokeOpacity: 0
			}*/
		}
	});


})();

export default gmaps;