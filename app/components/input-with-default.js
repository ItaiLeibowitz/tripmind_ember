import Ember from 'ember';

export default Ember.Component.extend({
	default: 'placeholder',
	valueOrDefault: Ember.computed('default', 'value', {
		get(key) {
			return this.get('value') || this.get('default')
		},
		set(key, value) {
			this.set('value', value || this.get('default'));
			return value;
		}
	}),
	focusOut: function(){
		var modelToSave = this.get('saveOnExit');
		if (modelToSave) modelToSave.save();
		console.log('focused out!')
	}
});
