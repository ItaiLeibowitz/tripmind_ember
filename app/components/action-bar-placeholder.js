import Ember from 'ember';

export default Ember.Component.extend({
	elementId: 'action-bar-placeholder',
	service: Ember.inject.service('action-service'),
	classNameBindings: ['isActive', 'addedClass'],
	isActive: Ember.computed.alias('service.hasSelected'),



});