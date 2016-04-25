import Ember from 'ember';

export default Ember.Component.extend({
	classNameBindings: ['addedClass'],

	click: function(){
		this.toggleProperty('isConfirming');
	},

	actions: {
		confirm: function(state){
			if (state){
				this.get('onConfirm')();
			}
		}
	}


});