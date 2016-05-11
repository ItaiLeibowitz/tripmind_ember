import Ember from 'ember';

export default Ember.Controller.extend({
	store: Ember.inject.service('store'),

	actions: {
		addDate: function(position){
			this.get('model').addDate(position)
		},
		addToCollection: function(type, itemSlug){
			var self = this,
				model = this.get('model'),
				itemId = itemSlug.split('+')[0];
			model.get('items').then(function(items){
				self.get('store').findRecord(type, itemId).then(function(item){
					items.addObject(item);
					item.save();
					model.save();
				})
			})
		}
	}
});