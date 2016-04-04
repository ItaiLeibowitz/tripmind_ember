import Ember from 'ember';

export default Ember.Component.extend({
	collections: null,
	store: Ember.inject.service('store'),
	actionService: Ember.inject.service('action-service'),

	init: function(){
		var self = this;
		this._super();
		this.get('store').findAll('collection').then(function(result){
			self.set('collections', result);
		})
	},


	actions: {
		chooseCollection: function(collection){
			var self = this,
				selectedIds = this.get('actionService.selectedIds'),
				itemsToAdd = this.get('store').peekAll('item').filter(function(item){
				return selectedIds.indexOf(item.get('id')) > -1;
			});
			collection.get('items').addObjects(itemsToAdd).then(function(results){
				self.get('actionService').clearSelected();
				self.get('closeAction')();
			})
		}
	}



});