import Ember from 'ember';
import betterSanitize from 'tripmind/appconfig/better_sanitize';

export default Ember.Component.extend({
	classNameBindings: ['isEditable'],
	attributeBindings: ['contenteditable'],


	mouseDown: function(e){
		if (e.target.tagName!="A"){
			this.set('contenteditable', this.get('canEditContent'));
		}
	},

	focusOut: function(){
		var modelToSave = this.get('saveOnExit');
		if (modelToSave) {
			this.set('value', betterSanitize(this.$().html()));
			this.set('contenteditable', false);
			if (modelToSave.get('updatedAt')){
				modelToSave.set('updatedAt', moment().format("X"));
			}
			modelToSave.save();
		}
		console.log('focused out!')
	}
});
