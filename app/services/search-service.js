import Ember from 'ember';
import promiseFromUrl from 'tripmind/mixins/promise_utils';
import GoogleItemSerializer from 'tripmind/mixins/google-item';

export default Ember.Service.extend(GoogleItemSerializer, {
	store: Ember.inject.service('store'),
	googlePlaces: Ember.inject.service('google-places'),
	itemDetailsService: Ember.inject.service('item-details-service'),


	getQueryPredictions: function(input) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			WA.Gmaps.PlacesAutocompleteService.getQueryPredictions({ input: input }, function (predictions, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					resolve(predictions);
				} else {
					reject(status);
				}
			});
		});
	},


	executeQuery: function (query) {
		var self = this;
		return self._loadWanderantItems(query).then(function (wanderantItems) {
			return self._getGoogleItems(query).then(function (googleItems) {

				var allItems = Ember.ArrayProxy.create({ content: [] });

				allItems.addObjects(wanderantItems);
				allItems.addObjects(googleItems);

				if (typeof("".distance) == "function") {
					return allItems.toArray().sort(function (a, b) {
						return self.searchRank(b, query, wanderantItems, googleItems) - self.searchRank(a, query, wanderantItems, googleItems);
					});
				} else {
					return allItems.toArray();
				}
			});
		});
	},



	findOrCreateFromPlaceId: function(placeId){
		var store = this.get('store'),
			self = this;
		return store.find('item', placeId).then(function(item){
			return item;
		}, function(status){
			var itemRecord = store.createRecord('item', {id: placeId, name: ""});
			return self.get('itemDetailsService').getAdditionalItemInfo(placeId)
		})
	}

});