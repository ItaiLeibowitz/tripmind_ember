import Ember from 'ember';
import Sortable from 'tripmind/mixins/sortable';

export default Ember.Component.extend(Sortable, {
	store: Ember.inject.service('store'),
	classNames: ['connected-sortable', 'items-sorter'],
	sortable_connectWith: '.connected-sortable',
	sortable_items: '.item-card',
	sortable_helper: "clone",
	sortable_update: function(event, ui){
		Ember.run.schedule('actions', this, '_sortableUpdate', event, ui);
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

	sortable_start: function(event, ui){
		// if ctrl is held when starting the move, then create another copy of this item when done
		if (event.ctrlKey){
			// The original is already kept thanks to the "helper = clone" option
			$(ui.item).show();
			//TODO: add a listener to adjust the state of the ctrl key
			var originalItemId = $(ui.item).find('.id').attr('data-id');
			this.set('originalItemId', originalItemId);
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
			var originalItemId = this.get('originalItemId');
			if (originalItemId){
				var item = store.peekRecord('item', originalItemId);
				newItems.unshiftObject(item);
				this.set('originalItemId', null);
			}
			modelToUpdate.set('items', newItems);
			//Ember.run.scheduleOnce('afterRender', this, '_removeItem', ui.item)
			modelToUpdate.save();
			//This is to refresh the items sorter after we copy from it. Not sure why but the component won't refresh otherwise
			if (this.get('withRefresh')) this.set('needsRefresh', true);
		}
	}

});