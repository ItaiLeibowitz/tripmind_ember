import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['link-card'],
	classNameBindings: ['addedClass', 'isExpanded'],
	addedClass: null,
	isExpanded: null,

	click: function () {
		this.toggleProperty('isExpanded');
	}
});