import Ember from 'ember';

export default Ember.Mixin.create({
	classNames: ['section-holder'],
	classNameBindings: ['isMinimized'],
	isMinimized: false,



	actions: {
		toggleMinimized: function () {
			this.toggleProperty('isMinimized');
		}
	}
});