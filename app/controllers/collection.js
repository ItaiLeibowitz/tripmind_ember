import Ember from 'ember';

export default Ember.Controller.extend({
	store: Ember.inject.service('store'),

	actions: {
		addDate: function(){
			var collection = this.get('model'),
				date = this.get('store').createRecord('date',{order: collection.get('dates.length') + 1});
			collection.get('dates').pushObject(date);
			date.save();
			collection.save();
		}
	}
});