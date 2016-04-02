import Ember from 'ember';

export default Ember.Component.extend({
	options: null,

	actions: {
		toggleThis: function(value){
			var options = this.get('options');
			options.forEach(function(option){
				if (option.get('value') == value) option.toggleProperty('isSelected');
			});
			this.get('onChange')();
		}
	}
});