import Ember from 'ember';
import Sortable from 'tripmind/mixins/sortable';
import geoDistances from 'tripmind/appconfig/geo_distance';

export default Ember.Component.extend(Sortable, {
	screenDefs: Ember.inject.service('screen-defs'),
	store: Ember.inject.service('store'),
	classNames: ['connected-sortable', 'items-sorter'],
	sortable_connectWith: '.connected-sortable',
	sortable_items: '.item-card',
	sortable_helper: "clone",
	sortable_update: function(event, ui){
		Ember.run.schedule('actions', this, '_sortableUpdate', event, ui);
	},


	init: function(){
		if ((this.get('screenDefs.screenWidth')) < 600) this.set('stopWidget', true);
		this._super();
	},

	sortable_over: function(event, ui){
		this.$().addClass('with-border');
		// update distance from
		var store = this.get('store'),
			compToUpdate = this.get('compToUpdate');
		if (compToUpdate) {
			var originalItemId = $(ui.item).find('.id').attr('data-id'),
				item = store.peekRecord('item', originalItemId),
				otherItems = compToUpdate.get('model.items');
			var minDistance, minItem, distanceTime, distanceText;
			var response = geoDistances.minDistance(item, otherItems);
			if (response) {
				[minDistance, minItem] = response
				switch (true) {
					case (minDistance < 0.1):
						distanceText = `Already here`;
						break;
					case (minDistance < 75):
						distanceTime = Math.max(1, Math.round(minDistance / 50 * 6)) * 10;
						distanceText = `+${distanceTime}min`;
						break;
					case (minDistance < 200):
						distanceTime = Math.round(minDistance / 50);
						distanceText = `+${distanceTime}hr`;
						break;
					case (minDistance < 500):
						distanceTime = Math.round(minDistance / 75);
						distanceText = `+${distanceTime}hr`;
						break;
					default:
						distanceText = 'Really far!';
						break;
				}
				this.set('compToUpdate.timeAwayText', distanceText);
			} else {
				this.set('compToUpdate.timeAwayText', null);
			}
		}
	},

	sortable_out: function(event, ui){
		this.$().removeClass('with-border');
		var	compToUpdate = this.get('compToUpdate');
		if (compToUpdate) {
			compToUpdate.set('timeAwayText', null);
		}
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