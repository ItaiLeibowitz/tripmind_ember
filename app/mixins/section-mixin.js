import Ember from 'ember';

export default Ember.Mixin.create({
	classNames: ['section-holder'],
	classNameBindings: ['isMinimized','inSelectMode', 'isSelected'],
	isMinimized: false,
	actionService: Ember.inject.service(),
	inSelectMode: Ember.computed.alias('actionService.hasSelected'),

	isSelected: function(){
		var selectedIds = this.get('actionService.selectedIds');
		var items = this.get('model.items');
		if (!items) return false;
		return items.every(function(item){
			return selectedIds.indexOf(item.get('id')) > -1;
		})
	}.property('model.items.[]','actionService.selectedIds.[]'),


	actions: {
		toggleMinimized: function () {
			this.toggleProperty('isMinimized');
		},
		toggleSelected: function(){
			var itemIds = this.get('model.items').map(function(item){
				return item.get('id');
			});
			if (this.get('isSelected')) {
				this.get('actionService.selectedIds').removeObjects(itemIds);
			} else {
				this.get('actionService.selectedIds').addObjects(itemIds);
			}
		}
	}
});