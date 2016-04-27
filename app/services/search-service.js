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

	googleTextQuery: function(query, location) {
		var self = this;
		if (undefined === location) {
			var request = {query: query};
		} else {
			var request = {query: query, location: location, radius: 1000};
		}
		//ga('send', 'event', 'search', 'googleTextQuery', query);

		return new Ember.RSVP.Promise(function (resolve, reject) {
			self.get('googlePlaces.service').textSearch(request, function (results, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					Ember.run(null, resolve, results);
				} else {
					Ember.run(null, reject, status);
				}
			})
		});
	},


	executeQuery: function (query) {
		var self = this,
			store = this.get('store'),
			itemDetailsService = this.get('itemDetailsService');
		return self.googleTextQuery(query).then(function (results) {
			var existingItems = [],
				itemsToBuild = [];
			for (var i = 0; i < results.length; i++) {
				var result = results[i];
				var itemRecord = store.peekRecord('item', result.place_id);
				if (itemRecord) {
					existingItems.push(itemRecord);
				} else {
					itemsToBuild.push({
						id: result.place_id,
						type: 'item',
						attributes: itemDetailsService.buildItemInfoFromResults({isTemporary: true}, result)
					})
				}
			}
			var newItems = store.push({data:itemsToBuild});
			return existingItems.concat(newItems);
		});
	},



	findOrCreateFromPlaceId: function(placeId){
		var store = this.get('store'),
			self = this;
		return store.find('item', placeId).then(function(item){
			return item;
		}, function(status){
			var currentTime = moment().format("X"),
				itemRecord = store.createRecord('item', {id: placeId, name: "", updatedAt: currentTime});
			return self.get('itemDetailsService').getAdditionalItemInfo(placeId)
		})
	}

});