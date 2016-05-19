import Ember from 'ember';
import betterSanitize from 'tripmind/appconfig/better_sanitize';

export default Ember.Component.extend({
	classNameBindings: ['isEditable','isEmpty'],
	attributeBindings: ['contenteditable'],
	valueOW: Ember.computed.oneWay('value'),


	isEmpty: function(){
		var value = this.get('value');
		if (!value) return true;
		if (typeof(value.trim) == 'function'){
			return value.trim().length == 0;
		}
		if (value.string) {
			return value.string.trim().length == 0;
		}
	}.property('value'),

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
			// This may be useful for something, but I think it's just an old unnecessary remnant that caused trouble
			/*this.set('value', null);
			this.$().html("");*/

			var defaultValue = this.get('defaultValue');
			if (defaultValue) {
				if (!currentValue) currentValue = defaultValue;
				if (typeof(currentValue.trim) == 'function'){
					if (currentValue.trim().length == 0) currentValue = defaultValue;
				}
				if (currentValue.string) {
					if (currentValue.string.trim().length == 0) currentValue = defaultValue;
				}
			}
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
