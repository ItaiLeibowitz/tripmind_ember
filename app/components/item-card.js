import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['item-card'],
	classNameBindings: ['addedClass', 'cardId', 'imageDidLoad'],
	addedClass: null,
	actionService: Ember.inject.service('action-service'),




});