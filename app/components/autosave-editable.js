import Ember from 'ember';
import betterSanitize from 'tripmind/appconfig/better_sanitize';

export default Ember.Component.extend({
	classNameBindings: ['isEditable'],
	attributeBindings: ['contenteditable'],
	valueOW: Ember.computed.oneWay('value'),


	mouseDown: function(e){
		if (e.target.tagName!="A"){
			this.set('contenteditable', this.get('canEditContent'));
		}
	},

	_updateValue(value){
		this.set('value', value);
		this.$().html(value);
	},

/*
	valueDidChange: function(){
		this.set('refreshModel.needsRefresh', true)
	}.observes('value').on('init'),
*/

	focusOut: function(){
		var modelToSave = this.get('saveOnExit'),
			self = this;
		if (modelToSave) {
			var currentValue = this.$().html();
			this.set('contenteditable', false);
			this.set('value', null);
			this.$().html("");
			this.set('value', currentValue);
			this.$().html(currentValue);
			if (modelToSave.get('updatedAt')){
				modelToSave.set('updatedAt', moment().format("X"));
			}
			modelToSave.save();
		}
		this.set('refreshModel.needsRefresh', true)
		console.log('focused out!')
	}
});
