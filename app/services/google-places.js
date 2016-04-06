import Ember from 'ember';

export default Ember.Service.extend({
	gmaps: Ember.inject.service('map-service'),
	map: Ember.computed.alias('gmaps.mapComponent.googleMapObject'),
	service: null,

	init: function(){
		this._super();
		this.set('service', new google.maps.places.PlacesService(this.get('map')));
	},

	googlePlaceIdGoogleQuery: function (placeId) {
		var placesService = this.get('service');
		return new Ember.RSVP.Promise(function (resolve, reject) {
			placesService.getDetails({placeId: placeId}, function (result, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					Ember.run(null, resolve, result);
				} else {
					Ember.run(null, reject, status);
				}
			})
		});
	},

});