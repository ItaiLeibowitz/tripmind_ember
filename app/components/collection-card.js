import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['collection-card'],
	classNameBindings: ['addedClass', 'cardId', 'imageDidLoad'],
	addedClass: null

});