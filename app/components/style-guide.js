import Ember from 'ember';

export default Ember.Component.extend({
	service: Ember.inject.service('screen-defs'),
	mapWidth: Ember.computed.alias('service.actualMapWidth'),
	barRightWidth: function(){
		return Math.max(this.get('mapWidth'), 48);
	}.property('mapWidth')

});