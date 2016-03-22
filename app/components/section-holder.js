import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['section-holder'],
	classNameBindings: ['isMinimized'],
	isMinimized: false,
	model: null,


	actions: {
		toggleMinimized: function () {
			this.toggleProperty('isMinimized');
		}
	}
});