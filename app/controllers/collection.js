import Ember from 'ember';

export default Ember.Controller.extend({
	store: Ember.inject.service('store'),

	actions: {
		addDate: function(position){
			this.get('model').addDate(position)
		}
	}
});