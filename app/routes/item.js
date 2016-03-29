import Ember from "ember";
import Utils from 'tripmind/appconfig/utils';


export default Ember.Route.extend({
	model: function (params) {
		var itemId = params.item_slug.split('+')[0],
			store = this.get('store');
		return store.findRecord('item', itemId)
			.then(function (itemRecord) {
				return store.findAll('potentialLink').then(function(allLinks){
					var relevantLinks = allLinks.filter(function (l) {
						return l.get('itemId') == itemId;
					});
					return Ember.Object.create({item: itemRecord, links: relevantLinks});
				});
			})
	},
	serialize: function(model) {
		return { item_path: model.get('item.path').replace(/[\/\s]/g,"_") };
	},
	setupController: function(controller, model){
		var item = model.get('item');
		this._super(controller, item);
	    var descendants = this.get('store').peekAll('item').filter(function(i){
			return i.get('ancestry') && i.get('ancestry').indexOf(item.get('path')) == 0;
		});
		var destinations = Ember.ArrayProxy.create({content: []}),
			attractions = Ember.ArrayProxy.create({content: []});
		for (var i = 0; i < descendants.length; i++) {
			var obj = descendants[i];
			if (obj.get('itemType') == 'locality' || obj.get('itemType') == "administrative_area_level_1") {
				destinations.pushObject(obj);
			} else {
				attractions.pushObject(obj);
			}
		}
		controller.setProperties({
			descendants: descendants,
			destinations: destinations,
			attractions: attractions,
			links: model.get('links')
		});
	}
});


