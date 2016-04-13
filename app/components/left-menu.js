import Ember from 'ember';

export default Ember.Component.extend({
	elementId: "left-menu",
	actionService: Ember.inject.service('action-service'),
	classNameBindings: ['isHidden'],
	isHidden: Ember.computed.alias('actionService.hasSelected')
});