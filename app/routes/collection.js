import Ember from "ember";
import promiseFromAjax from 'tripmind/appconfig/promise_from_ajax';
import Constants from 'tripmind/appconfig/constants';


export default Ember.Route.extend({


	_reloadFromServer: function (collectionId) {
		var store = this.get('store');
		return promiseFromAjax({
			url: Constants.BASE_SERVER_URL + '/api/tm/tm_collections/' + collectionId,
			type: 'GET'
		}).then(function (result) {
			var compressedData = result.data.attributes.data,
				unpackedData = lzwCompress.unpack(compressedData),
				rebuiltData = JSON.parse(unpackedData);
			store.push({data: rebuiltData});
			return store.peekRecord('collection', collectionId)
		});
	},

	_checkDateAndUpdate: function(collection){
		if (!collection) return;
		var self = this;
		return promiseFromAjax({
			url: Constants.BASE_SERVER_URL + '/api/tm/tm_collections/' + collection.get('id') + '/check_date',
			type: 'GET'
		}).then(function (result) {
			if (result.date > collection.get('updatedAt')) {
				self._reloadFromServer(collection.get('id'));
			}
		})
	},
	// We first check the store for the collection.
	// Then we check it's last updated date vs the server's
	// if it doesn't exist or is outdated then we load it from server
	model: function (params) {
		var self = this,
			collectionId = params.collection_slug.split('-')[0],
			store = this.get('store');
		return store.findRecord('collection', collectionId).then(function(collection){
			var items = collection.get('items');
			Ember.run.scheduleOnce('sync', self, '_checkDateAndUpdate', collection);
			return collection;
		}, function(){
			console.log('couldnt find collection, looking on server');
			return self._reloadFromServer(collectionId)
		})
	},
	serialize: function(model) {
		return { collection_path: model.get('collection.slug').replace(/[\/\s]/g,"_") };
	}
});


