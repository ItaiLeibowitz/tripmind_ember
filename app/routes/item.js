import Ember from "ember";
import Utils from 'tripmind/appconfig/utils';


export default Ember.Route.extend({
	model: function(params) {
		return this.get('store').peekRecord('item', params.item_id);
	},
	serialize: function(model) {
		return { item_path: model.get('path').replace(/[\/\s]/g,"_") };
	}
});


