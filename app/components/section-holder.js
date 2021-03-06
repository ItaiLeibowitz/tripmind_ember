import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['section'],
	classNameBindings: ['isMinimized'],
	isMinimized: false,
	model: null,


	actions: {
		toggleMinimized: function () {
			this.toggleProperty('isMinimized');
		}
	}
});