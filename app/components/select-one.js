import Ember from 'ember';

export default Ember.Component.extend({
	options: null,

	actions: {
		selectThis: function(value){
			var options = this.get('options');
			options.forEach(function(option){
				option.set('isSelected', option.get('value') == value);
			});
			this.get('onChange')();
		}
	}
});