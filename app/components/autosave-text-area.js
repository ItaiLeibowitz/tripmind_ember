import Ember from 'ember';

export default Ember.TextArea.extend({
	didInsertElement:function(){
		 this.resizeToFitText();
	},

	resizeToFitText: function(){
		this.$().height(0);
		this.$().height(this.$().prop('scrollHeight'));
	},

	valueDidChange: function(){
		Ember.run.scheduleOnce('afterRender', this, 'resizeToFitText');
	}.observes('value'),


	focusOut: function(){
		var modelToSave = this.get('saveOnExit');
		if (modelToSave) {
			if (modelToSave.get('updatedAt')){
				modelToSave.set('updatedAt', moment().format("X"));
			}
			modelToSave.save();
		}
		console.log('focused out!')
	}
});
