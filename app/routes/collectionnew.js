import Ember from "ember";
import promiseFromAjax from 'tripmind/appconfig/promise_from_ajax';
import Constants from 'tripmind/appconfig/constants';


export default Ember.Route.extend({
	model: function (params) {
		var collectionId = params.collection_slug.split('-')[0],
			store = this.get('store');
		return store.findRecord('collection', collectionId).then(function(collection){
			var items = collection.get('items');
			return collection;
		}, function(){
			console.log('couldnt find collection, looking on server');
			return promiseFromAjax({
				url: Constants.BASE_SERVER_URL + '/api/tm/tm_collections/' + collectionId,
				type: 'GET'
			}).then(function(result){
				var compressedData = result.data.attributes.data,
					unpackedData = lzwCompress.unpack(compressedData),
					rebuiltData = JSON.parse(unpackedData);
				store.push({data: rebuiltData});
				return store.peekRecord('collection', collectionId)
			})
		})
	},
	serialize: function(model) {
		return { collection_path: model.get('collection.slug').replace(/[\/\s]/g,"_") };
	},
	templateName: 'collection'
});


