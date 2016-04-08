import Ember from 'ember';

export default Ember.Component.extend({
	mapService: Ember.inject.service('map-service'),
	//classNames: ['map-holder'],
	classNameBindings: ['isOriginal'],
	googleMapObject: null,
});
