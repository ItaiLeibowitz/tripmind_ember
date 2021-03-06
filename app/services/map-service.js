import Ember from 'ember';
import gmaps from 'tripmind/appconfig/gmaps';

export default Ember.Service.extend({
	constantOptions: {
		mapTypeControl: false,
		zoom: 3,
		maxZoom: 19,
		minZoom: 2,
		noClear: true,
		mapTypeControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		streetViewControl: false,
		//styles: gmaps.styles.originalStyles[0]
	},
	withAllMarkers: false,
	mapComponent: null,
	centerMarker: null,
	centerLat: 34.851939,
	centerLng: -82.399752,
	zoom: 15,
	draggable: true,
	scrollwheel: true,
	disableDefaultUI: false,
	bounds: null,
	lastHolder: null,
	googleMapObject: null,
	isExpanded: false,

	init: function(){
		this._super();
		var container = $('.map-canvas')[0];
		var options = this.get('options');
		var map = new window.google.maps.Map(container, options);
		this.set('googleMapObject', map);
		this._setMapListeners(map);
		this.set('directionsService',new google.maps.DirectionsService());
	},

	 _setMapListeners: function(map) {
		var self = this;

		google.maps.event.addListener(map, 'zoom_changed', function () {
			Ember.run.debounce(self, '_updateEmberBounds', 200);
		});

		google.maps.event.addListener(map, 'click', function () {
			self.get('collectionMarkers').send('minimizeAllMarkers');
		});

		google.maps.event.addListener(map, 'resize', function () {
			self.scheduleFitBounds();
			//	self.get('mapService.collectionMarkers').send('minimizeAllMarkers');
		});

		google.maps.event.addListener(map, 'dragend', function () {
			Ember.run.debounce(self, '_updateEmberBounds', 200);
			/*
			 self._addMarkersFromBounds(map);
			 */
		});

		google.maps.event.addListener(map, 'bounds_changed', function () {
		});

	},

	_updateEmberBounds: function () {
		if (!this.get('isExpanded'))return;
		if (this.get('automaticFittingInProgress')) return;
		console.log('updating bounds')
		this.set('preventBoundsListener', true)
		var boundsObject = this.get('googleMapObject').getBounds(),
			bounds = {
				neLat: boundsObject.getNorthEast().lat(),
				neLng: boundsObject.getNorthEast().lng(),
				swLat: boundsObject.getSouthWest().lat(),
				swLng: boundsObject.getSouthWest().lng()
			};
		this.set('bounds', bounds);
		var self = this;
		Ember.run.scheduleOnce('afterRender', this, function(){
			self.set('preventBoundsListener', false);
		})
	},


	resizeMap: function(){
		Ember.run.scheduleOnce('afterRender', this, '_resizeMap');
	},

	_resizeMap: function(){
		google.maps.event.trigger(this.get('googleMapObject'), 'resize');
	},

	mapOptionsDidChange: function(){
		Ember.run.scheduleOnce('afterRender', this, 'updateOptions')
	}.observes('options'),

	mapBoundsDidChange: function(){
		if (this.get('bounds')) this.scheduleFitBounds();
	}.observes('bounds').on('init'),

	updateOptions: function(){
		var options = this.get('options');
		this.get('googleMapObject').setOptions(options);
	},

	scheduleFitBounds: function(){
		if (this.get('isExpanded')) {
			Ember.run.scheduleOnce('afterRender', this, 'fitToBounds');
		}
	},

	fitToBounds: function () {
		if (this.get('preventBoundsListener')) return;
		console.log('fitting bounds!')
		var bounds = this.get('bounds');
		if (!bounds) return;
		var map = this.get('googleMapObject');
		var sw = new google.maps.LatLng(bounds.swLat, bounds.swLng);
		var ne = new google.maps.LatLng(bounds.neLat, bounds.neLng);
		this.set('automaticFittingInProgress', true);
		map.fitBounds(new google.maps.LatLngBounds(sw, ne));
		var self = this;
		Ember.run.later(this, function(){
			self.set('automaticFittingInProgress', false);
		}, 1000);

	},



	center: function(){
		return new window.google.maps.LatLng(
			this.get('centerLat'),
			this.get('centerLng')
		)
	}.property('centerlLat', 'centerLng'),

	options: function(){
		return $.extend(this.get('constantOptions'), {
			center: this.get('center'),
			zoom: this.get('zoom'),
			draggable: this.get('draggable'),
			scrollwheel: this.get('scrollwheel'),
			disableDefaultUI: this.get('disableDefaultUI')
		});
	}.property('center','zoom', 'draggable', 'disableDefaultUI', 'scrollwheel'),

	moveDomToElement: function(elem){
		$('#actual-map').appendTo(elem);
		var map = this.get('googleMapObject');
		google.maps.event.trigger(map, 'resize');
		this.set('currentElement', elem);
	},

	changeCenter: function(lat, lng){
		this.setProperties({
			centerLat: lat,
			centerLng: lng
		});
		this.reCenter();
	},

	reCenter: function(){
		this.get('googleMapObject').setCenter(this.get('center'));
	},

	scheduleReCenter: function(){
		Ember.run.scheduleOnce('afterRender', this, 'reCenter');
	},

	toggleExpanded: function(){
		if (this.get('isExpanded')){
			this.minimizeMap();
		} else {
			this.expandMap();
		}
	},

	expandMap: function(currentElem){
		this.set('isExpanded', true);
		this.set('lastCurrentItem', this.get('currentItem.item'));
		this.set('withAllMarkers', true);
		$('#actual-map').appendTo('#expanded-map');
		this.resizeMap();
		this.scheduleReCenter();
		this.setProperties({
			draggable: true,
			scrollwheel: true,
			disableDefaultUI: false
		})
	},
	minimizeMap: function(options){
		this.set('isExpanded', false);
		var closeAll = options ? options.closeAll : false;
		var minimizedHolder = this.get('minimizedHolder');
		if (minimizedHolder) {
			$('#actual-map').appendTo(minimizedHolder.$());
			minimizedHolder.attachMap();
		}
//		this.get('currentItem').setProperties({
//			isOpen: closeAll ? false : this.get('lastItemCardPosition'),
//			item: this.get('lastCurrentItem'),
//			withMap: true,
//			withPhoto: false
//		});
		this.set('withAllMarkers', false);
		this.resizeMap();
		this.scheduleReCenter();
		$('#expanded-map').removeClass('is-expanded');
		this.setProperties({
			draggable: false,
			scrollwheel: false,
			disableDefaultUI: true
		})
	},

	openItemMenu: function(model){
		var currentItem = this.get('currentItem');
		currentItem.setProperties({
			item: model,
			isOpen: true,
			withMap: false,
			withPhoto: true,
			isAd: this.get('isAd'),
			currentListCard: null
		});
	},



	getBoundingBox: function (coordsArray) {
		if (coordsArray.length > 0) {
			var D_WRAP_LNG = 180;
			var minLat = coordsArray[0][0],
				maxLat = coordsArray[0][0],
				minLng = coordsArray[0][1],
				maxLng = coordsArray[0][1];
			for (var i = 0; i < coordsArray.length; i++) {
				var coords = coordsArray[i];
				// Fix the longitudinal wrapping if in a country where there is discontinuity in coords (e.g., Mexico)
				if (coords[1] - minLng > D_WRAP_LNG)coords[1] -= 360;
				if (coords[1] - minLng < -D_WRAP_LNG) coords[1] += 360;

				if (coords[0] < minLat) minLat = coords[0];
				if (coords[0] > maxLat) maxLat = coords[0];
				if (coords[1] < minLng) minLng = coords[1];
				if (coords[1] > maxLng) maxLng = coords[1];
			}
			return {swLat: minLat, swLng: minLng, neLat: maxLat, neLng: maxLng};

		} else {
			return false;
		}
	}

});