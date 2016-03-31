import Ember from 'ember';

export default Ember.Component.extend({
	elementId: 'action-bar',
	service: Ember.inject.service('action-service'),
	classNameBindings: ['isActive'],
	isActive: Ember.computed.alias('service.isActive'),





});