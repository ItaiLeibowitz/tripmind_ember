import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['item-card'],
	classNameBindings: ['addedClass', 'cardId', 'imageDidLoad'],
	addedClass: null,

	photoStyle: function(){
		return `background-image: url(${this.get('model.image')})`;
	}.property('model.image'),


});