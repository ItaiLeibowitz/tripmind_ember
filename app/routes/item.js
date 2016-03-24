import Ember from "ember";
import Utils from 'tripmind/appconfig/utils';


export default Ember.Route.extend({
	model: function(params) {
		return this.get('store').peekRecord('item', params.item_id);
	},
	serialize: function(model) {
		return { item_path: model.get('path').replace(/[\/\s]/g,"_") };
	},
	setupController: function(controller, model){
		this._super(controller, model);
	    var descendants = this.get('store').peekAll('item').filter(function(item){
			return item.get('ancestryNames').indexOf(model.get('path')) == 0;
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
			attractions: attractions
		});
	}
});


