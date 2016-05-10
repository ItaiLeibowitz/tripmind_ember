import Ember from 'ember';
import gmaps from 'tripmind/appconfig/gmaps';

export default Ember.Component.extend({
	mapService: Ember.inject.service('map-service'),
	directionsService: Ember.computed.alias('mapService.directionsService'),

	waypoints: function(){
		return this.get('items').map(function(item){
			return { location: new google.maps.LatLng(item.get('lat'), item.get('lng')) };
		})
	}.property('items.[]'),

	itemNameString: function(){
		var nameString =  this.get('items').map(function(item){
			return item.get('name')
		}).join("")
		return nameString
	}.property('items.[]'),

	_getDirections: function(){
		var self = this;
		return new Ember.RSVP.Promise(function(resolve, reject) {
			var waypoints = self.get('waypoints');

			if (waypoints.get('length') < 2) resolve(0);

			var origin = waypoints[0];
			var destination = waypoints[waypoints.length - 1];
			var request = {
				origin: origin.location,
				destination: destination.location,
				waypoints: waypoints.slice(1, [waypoints.length - 1]),
				travelMode: google.maps.TravelMode.DRIVING
			};


			self.get('directionsService').route(request, function (response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					console.log('success drawing route');
					resolve(response);
				} else if (status == google.maps.DirectionsStatus.ZERO_RESULTS) {
					console.log('zero results!');
					resolve(0);
				} else {
					console.log('route not drawn:', status);
					reject(status);
				}
			});


		});
	},

	_drawDirections: function(response) {
		var directionsDisplay = this.get('directionsDisplay');

		directionsDisplay.setDirections(response);
		directionsDisplay.setMap(this.get('mapService.googleMapObject'));

	},

	didInsertElement: function () {
		this._super();
		var displayOptions = $.extend(gmaps.directionsDisplayOptions, {
				polylineOptions: gmaps.createPolylineOptions(this.get('color')).default
			}
		);
		var directionsDisplay = new google.maps.DirectionsRenderer(gmaps.directionsDisplayOptions);
		this.set('directionsDisplay', directionsDisplay);
		directionsDisplay.setMap(this.get('mapService.googleMapObject'));
		Ember.run.scheduleOnce('afterRender', this, '_refreshDirections');
		this.get('itemNameString');

	},

	colorDidChange: function(){
		var directionsDisplay = this.get('directionsDisplay');
		if (directionsDisplay){
			directionsDisplay.polylineOptions = gmaps.createPolylineOptions(this.get('color')).default;
		}
	}.observes('color').on('init'),

	_refreshDirections: function(){
		var self = this;
		this._getDirections()
			.then(function(response){
				if (response != 0) {
					self._drawDirections(response);
				} else {
					self.get('directionsDisplay').setMap(null);
				}
			})
	},

	itemsDidChange: function(){
		this._checkItemOrder();
	}.observes('items.[]').on('init'),

	_checkItemOrder: function(){
		var currentOrder = this.get('itemNameString');
		if (currentOrder != this.get('oldNameString')) {
			this.set('oldNameString', currentOrder);
			Ember.run.scheduleOnce('afterRender', this, '_refreshDirections');
		}
	},


	willDestroyElement: function(){
		var directionsDisplay = this.get('directionsDisplay');
		directionsDisplay.setMap(null);
		this._super();
	},




});


