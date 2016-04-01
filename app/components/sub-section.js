import Ember from 'ember';
import sectionMixin from 'tripmind/mixins/section-mixin';

export default Ember.Component.extend(sectionMixin, {
	classNames:['sub-section'],
	actionService: Ember.inject.service(),
	classNameBindings: ['inSelectMode', 'isSelected'],
	inSelectMode: Ember.computed.alias('actionService.hasSelected'),

	isSelected: function(){
		var selectedIds = this.get('actionService.selectedIds');
		return this.get('model.items').every(function(item){
			return selectedIds.indexOf(item.get('id')) > -1;
		})
	}.property('model.items.[]','actionService.selectedIds.[]'),

	actions: {
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