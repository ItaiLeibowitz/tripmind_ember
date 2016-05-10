import Ember from 'ember';
import Sortable from 'tripmind/mixins/sortable';

export default Ember.Component.extend(Sortable, {
	store: Ember.inject.service('store'),
	classNames: ['connected-sortable', 'items-sorter'],
	sortable_connectWith: '.connected-sortable',
	sortable_items: '.item-card',
	sortable_update: function(event, ui){
		Ember.run.schedule('actions', this, '_sortableUpdate', event, ui);
	},
	sortable_remove: function(event, ui){
		Ember.run.schedule('afterRender', this, '_sortableRemove', event, ui);
	},

	sortable_over: function(event, ui){
		this.$().addClass('with-border');
	},

	sortable_out: function(event, ui){
		this.$().removeClass('with-border');
	},

	sortable_stop: function(event, ui){
		this.$().removeClass('with-border');
	},

	_sortableRemove: function(event, ui){
		if (this.get('remove')) {
			var collection = this.get('modelToUpdate');
			var id = $(ui.item).find('.id').attr('data-id');
			var store = this.get('store');
			var item = store.peekRecord('item', id);
			collection.get('items').removeObject(item);
			collection.save();
		}
	},


	_removeItem: function(el){
		$(el).remove();
	},

	_sortableUpdate: function(event, ui){
		var store = this.get('store'),
			modelToUpdate = this.get('modelToUpdate');
		if (this.get('update')) {
			var newItems = this.$().find('.item-card').toArray().map(function(el){
				return $(el).find('.id').attr('data-id');
			}).map(function(id, idx	){
				var item = store.peekRecord('item', id);
				return item
			});
			modelToUpdate.set('items', newItems);
			//Ember.run.scheduleOnce('afterRender', this, '_removeItem', ui.item)
			modelToUpdate.save();
		}
	}

});