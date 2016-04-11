import Ember from "ember";


export default Ember.Route.extend({
	model: function (params) {
		var itemId = params.collection_slug.split('-')[0],
			store = this.get('store');
		return store.findRecord('collection', itemId).then(function(collection){
			var items = collection.get('items');
			return collection;
		})
	},
	serialize: function(model) {
		return { collection_path: model.get('collection.slug').replace(/[\/\s]/g,"_") };
	}
});


