import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['item-card'],
	classNameBindings: ['addedClass', 'cardId', 'imageDidLoad', 'isSelected','inSelectMode'],
	addedClass: null,
	actionService: Ember.inject.service('action-service'),

	isSelected: function(){
		return this.get('actionService').get('selectedIds').indexOf(this.get('model.id')) > -1
	}.property('model.id','actionService.selectedIds.[]'),

	inSelectMode: Ember.computed.alias('actionService.hasSelected'),

	mouseEnter: function(){
		this.set('model.isHovered', true);
	},
	mouseLeave: function(){
		this.set('model.isHovered', false);
	},

	actions: {
		    toggleSelected: function(){
				if (this.get('isSelected')) {
					this.get('actionService.selectedIds').removeObject(this.get('model.id'));
				} else {
					this.get('actionService.selectedIds').pushObject(this.get('model.id'));
				}
				return false;
			}
	}


});