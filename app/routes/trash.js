import Ember from 'ember';



export default Ember.Route.extend({
	model: function () {
		var store = this.get('store');
		return store.findAll('item')
			.then(function (results) {
				return results.filter(function (item) {
					return !item.get('trackingStatus') && !item.get('isTemporary');
				});
			});
	},
	templateName: 'index',
	setupController: function(controller,model){
		this._super(controller, model);
		controller.set('prefilterAttribute','trackingStatus-not');
		controller.set('actionBarVersion', 'trash');
		controller.set('isTrash', true);
	}
});
