import Ember from 'ember';



export default Ember.Route.extend({
	model: function(){
		var store = this.get('store');
		return store.findAll('item')
	},
	setupController: function(controller, model){
		this._super(controller, model);
	}
});
