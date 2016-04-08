import Ember from 'ember';

export default Ember.Component.extend({
	service: Ember.inject.service('screen-defs'),
	mapWidth: Ember.computed.alias('service.actualMapWidth')

});