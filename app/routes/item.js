import Ember from "ember";
import Utils from 'tripmind/appconfig/utils';


export default Ember.Route.extend({
	model: function (params) {
		var itemId = params.item_slug.split('+')[0],
			store = this.get('store');
		return store.findRecord('item', itemId)
			.then(function (itemRecord) {
			// load all relevant links
				return store.findAll('potentialLink').then(function(allLinks){
					var relevantLinks = allLinks.filter(function (l) {
						return l.get('itemId') == itemId;
					});
					return {item: itemRecord, links: relevantLinks};
				});
			})
			.then(function (result) {
			   	return store.findAll('item').then(function(items){
					var descendants = items.filter(function(i){
						return i.get('trackingStatus') && i.get('ancestry') && i.get('ancestry').indexOf(result.item.get('path')) == 0;
					});
					return Ember.Object.create($.extend(result, {descendants: descendants}))
				})
			})
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


