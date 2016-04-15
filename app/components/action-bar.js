import Ember from 'ember';

export default Ember.Component.extend({
	elementId: 'selected-action-bar',
	service: Ember.inject.service('action-service'),
	classNames: ['action-bar'],
	classNameBindings: ['isActive','addedClass'],
	isActive: Ember.computed.alias('service.hasSelected'),

	isTrash: Ember.computed.equal('addedClass','trash'),

	showActionButtons: function(){
		return !(this.get('service.hasSelected') && this.get('canBeSelected'));
	}.property('targetModel','service.hasSelected'),

	currentIsSelected: function(){
		return this.get('service').selectedIncludes(this.get('targetModel.id'));
	}.property('targetModel.id', 'service.selectedIds.[]'),

	actions: {
		clearSelection: function(){
			this.get('service').clearSelected();
		},
		addSelected: function(targetModel){
			this.send('openTopModal', 'addToCollection', targetModel)
		},
		removeFromCollection: function(targetModel){
			this.get('service').removeFromCollection(targetModel);
		},
		trashSelected: function(targetModel){
			this.get('service').trashSelected(targetModel);
		},
		openTopModal: function(modalName, targetModel){
			this.get('openModalAction')(modalName, targetModel)
		},
		toggleSelected: function(targetModel){
			this.get('service').toggleSelected(targetModel.get('id'));
		},
	}


});