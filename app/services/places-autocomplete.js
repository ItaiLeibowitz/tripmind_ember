import Ember from 'ember';

export default Ember.Service.extend({
	gmaps: Ember.inject.service('map-service'),
	map: Ember.computed.alias('gmaps.mapComponent.googleMapObject'),
	service: null,

	init: function(){
		this._super();
		this.set('service', new google.maps.places.AutocompleteService())
	}

});