import Ember from "ember";

export default Ember.Service.extend({
	selectedIds: null,
	store: Ember.inject.service('store'),

	init: function() {
		this._super(...arguments);
		this.set('selectedIds', Ember.ArrayProxy.create({content: []}));
	},

	clearSelected: function(){
		this.get('selectedIds').clear();
	},

	removeFromCollection: function(collection){
		var selectedIds = this.get('selectedIds');
		var itemsToRemove = this.get('store').peekAll('item').filter(function (item) {
			return selectedIds.indexOf(item.get('id')) > -1;
		});
		collection.get('items').removeObjects(itemsToRemove);
		collection.save();
		itemsToRemove.forEach(function(item){
			item.save();
		});
		this.clearSelected();
		ga('send', 'event', 'removeFromCollection')
	},

	toggleSelected: function(targetId){
		if (this.selectedIncludes(targetId)) {
			this.get('selectedIds').removeObject(targetId);
		} else {
			this.get('selectedIds').addObject(targetId);
		}
	},

	trashSelected: function(targetModel){
		var selectedIds = this.get('selectedIds');
		var itemsToTrash = targetModel ? [targetModel] : this.get('store').peekAll('item').filter(function (item) {
			return selectedIds.indexOf(item.get('id')) > -1;
		});
		itemsToTrash.forEach(function(item){
			item.toggleProperty('trackingStatus');
			item.save();
		});
		this.clearSelected();
		ga('send', 'event', 'sendToTrash')

	},

	numOfSelected: function(){
		return this.get('selectedIds.length');
	}.property('selectedIds.[]'),

	selectedIncludes: function(id){
		return this.get('selectedIds').indexOf(id) > -1;
	},

	hasSelected: function(){
		return this.get('numOfSelected') > 0;
	}.property('numOfSelected')
});


