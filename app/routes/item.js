import Ember from "ember";
import Utils from 'tripmind/appconfig/utils';


export default Ember.Route.extend({
	model: function (params) {
		var itemId = params.item_slug.split('+')[0],
			store = this.get('store');
		return store.findRecord('item', itemId)
			.then(function (itemRecord) {
			   	return store.findAll('item').then(function(items){
					var descendants = items.filter(function(i){
						return i.get('trackingStatus') && i.get('ancestry') && i.get('ancestry').indexOf(itemRecord.get('path')) == 0;
					});
					return Ember.Object.create({item: itemRecord, descendants: descendants})
				});
			});
	},
	serialize: function(model) {
		return { item_path: model.get('item.path').replace(/[\/\s]/g,"_") };
	},
	setupController: function(controller, model){
		this._super(controller, model.get('item'));
		controller.setProperties({
			descendants: model.get('descendants'),
		});
	}
});


