import Ember from 'ember';



export default Ember.Route.extend({
	model: function () {
		var store = this.get('store');
		return store.findAll('item')
			.then(function (results) {
				return results.filter(function (item) {
					return item.get('trackingStatus');
				}).sortBy('updatedAt').reverseObjects();
			});
	},
	setupController: function(controller,model){
		this._super(controller, model);
		controller.set('prefilterAttribute','trackingStatus');
	}
});
