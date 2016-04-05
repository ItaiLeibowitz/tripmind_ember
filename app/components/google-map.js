import Ember from 'ember';

export default Ember.Component.extend({
	mapService: Ember.inject.service('map-service'),
	elementId: 'actual-map',
	classNames: ['map-holder'],
	classNameBindings: ['isOriginal'],
	googleMapObject: null,

	insertMap: function () {
		this.get('mapService').set('mapComponent', this);
		var container = this.$('.map-canvas')[0];
		var options = this.get('mapService.options');
		var map = new window.google.maps.Map(container, options);
		this.set('googleMapObject', map);
		this._setMapListeners(map);
	}.on('didInsertElement'),


	_setMapListeners: function(map) {
		var self = this;

		google.maps.event.addListener(map, 'zoom_changed', function () {
			/*var zoomLevel = this.getZoom();
			this.setOptions({ styles: WA.Gmaps.styles.originalStyles[WA.Gmaps.stylesByZoomLevel[zoomLevel]] });
			Ember.run.debounce(self, '_addMarkersFromBounds', map, 200);
			Ember.run.debounce(self, '_toggleRoutes', zoomLevel, 200);
			Ember.run.debounce(self, '_addClassToTiles', 200);*/
		});

		google.maps.event.addListener(map, 'click', function () {
		/*	self.get('mapService.collectionMarkers').send('minimizeAllMarkers');
			self.get('generatedMarkersList').invoke('reset');
			self.get('currentCollectionMarkersList').invoke('reset');
			self.get('currentRoute').reset();
			self.get('viewedRoute').reset();*/
		});

		google.maps.event.addListener(map, 'resize', function () {
			self.scheduleFitBounds();
		//	self.get('mapService.collectionMarkers').send('minimizeAllMarkers');
		});

		google.maps.event.addListener(map, 'dragend', function () {
/*
			self._addMarkersFromBounds(map);
*/
		});

	},


	resizeMap: function(){
		Ember.run.scheduleOnce('afterRender', this, '_resizeMap');
	},

	_resizeMap: function(){
		google.maps.event.trigger(this.get('googleMapObject'), 'resize');
	},

	mapOptionsDidChange: function(){
		Ember.run.scheduleOnce('afterRender', this, 'updateOptions')
	}.observes('mapService.options'),

	mapBoundsDidChange: function(){
		Ember.run.scheduleOnce('afterRender', this, 'fitToBounds')
	}.observes('mapService.bounds'),

	updateOptions: function(){
		var options = this.get('mapService.options');
		this.get('googleMapObject').setOptions(options);
	},

	scheduleFitBounds: function(){
		Ember.run.scheduleOnce('afterRender', this, 'fitToBounds');
	},

	fitToBounds: function(){
		/*var bounds = this.get('mapService.bounds');
		var map = this.get('googleMapObject');
		var sw = new google.maps.LatLng(bounds.swLat, bounds.swLng);
		var ne = new google.maps.LatLng(bounds.neLat, bounds.neLng);

		map.fitBounds(new google.maps.LatLngBounds(sw, ne));*/
	}
});
