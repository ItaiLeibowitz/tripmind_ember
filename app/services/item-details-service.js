import Ember from 'ember';
import Constants from 'tripmind/appconfig/constants'

export default Ember.Service.extend({
	store: Ember.inject.service('store'),
	googlePlaces: Ember.inject.service('google-places'),
	placesAutocomplete: Ember.inject.service('places-autocomplete'),

	getAdditionalItemInfo: function (placeId) {
		var store = this.get('store'),
			self = this;
		return new Ember.RSVP.Promise(function (resolve, reject) {
			// First check if the item is already in the store - if it is no need to bring it again!
			var itemRecord = store.peekRecord('item', placeId);
			if (itemRecord && itemRecord.get('additionalInfoComplete')) resolve(itemRecord);
			// Otherwise, we will get additional information with a delay to prevent overloading the quota
			Ember.run.later(function () {
				self.get('googlePlaces.service').getDetails({placeId: placeId}, function (result) {
					//console.log(result);
					var item = store.peekRecord('item', placeId);
					if (!item || !result) {
						reject({message: "didn't find the item or its representation in the store"});
					} else {
						item.set('phone', result.international_phone_number);
						if (!item.get('googleHours') && result.opening_hours) item.set('googleHours', result.opening_hours.periods);
						if (!item.get('name')) item.set('name', result.name);
						if (!item.get('lat') && result.geometry) {
							item.set('lat', result.geometry.location.lat());
							item.set('lng', result.geometry.location.lng());
						}
						if (result.types && result.types.length > 0) {
							item.itemType = result.types[0];
						}
						if (!item.get('image') && result.photos && result.photos[0]) {
							item.set('image', result.photos[0].getUrl({maxWidth: 3000}));
							//item.set('imageAttribution', result.photos[0].html_attributions[0]);
						}
						//TODO: save additional photos
						//TODO: Save reviews
						if (result.address_components) {
							var ancestryNames = self.getAncestryFromAddress(result.address_components, result.name);
							//console.log('ancestryNames', ancestryNames);
							// Update the item record with the proper ancestry names
							item.set('ancestryNames', ancestryNames);
							// Save an index in the store to easily find this item based on its pathname
							var pathNames = item.get('pathNames');
							store.push({data: {id: pathNames,
								type: 'pathIndex',
								attributes: {
									itemId: placeId
								}}
							});
							self.findParentFromAncestry(ancestryNames, item.get('lat'), item.get('lng'), item)
								.then(function (parent) {
									if (parent) {
										item.set('ancestryNames', parent.get('pathNames'));
										item.set('ancestry', parent.get('path'));
									}
									item.set('updatedAt', moment().format("X"));
									item.save()
										.then(function (savedItem) {
											resolve(savedItem);
										});
								});

						} else {
							item.set('updatedAt', moment().format("X"));
							item.save()
								.then(function (savedItem) {
									resolve(savedItem);
								});
						}
					}
				});
			}, 1100);

		});
	},

	getAncestryFromAddress: function (addr, name) {
		var ancestryArray = [];
		for (var i = addr.length - 1; i >= 0; i--) {
			var obj = addr[i];
			if (obj.long_name
				&& obj.long_name.length > 1
				&& obj.long_name != name
				&& obj.types && obj.types[0]
				&& Constants.allowedLocationTypesLimited.indexOf(obj.types[0]) > -1) {
				ancestryArray.push(obj.long_name)
			}
		}
		return ancestryArray.join("/")
	},


	// Returns a promise that resolves to a parent record based on ancestry
	findParentFromAncestry: function (ancestryNames, lat, lng, item) {
		var store = this.get('store'),
			self = this;
		return new Promise(function (resolve, reject) {
			// If there's not ancestry, we resolve quickly with a null item
			if (ancestryNames.length == 0) {
				resolve(null);
				// Else there should be a parent
			} else {
				// If we find the parent in the store based on its path index then we resolve with it
				var parentPlaceId = store.peekRecord('pathIndex', ancestryNames);
				if (parentPlaceId) {
					var parentItem = store.peekRecord('item', parentPlaceId.get('itemId'));
					resolve(parentItem);
					// If we don't find it already in the store then we have to find it first:
				} else {
					// first, query it
					var ancestryNamesArr = ancestryNames.split("/"),
						types = ancestryNamesArr.length > 1 ? '(cities)' : null;
					var query = {input: ancestryNamesArr.reverse().join(", "), location: new google.maps.LatLng(lat, lng), radius: 10000};
					self.findParentFromQuery(query)
						// then we have to find its full info so that its'  path is filled in
						.then(function (itemRecord) {
							return self.getAdditionalItemInfo(itemRecord.get('id'))
						})
						// only then we can resolve it.
						.then(function (filledInItem) {
							resolve(filledInItem)
						})
				}

			}
		});
	},

	// This find request uses autocomplete, where we can scope the results by destinations only.
	findParentFromQuery: function (query) {
		var store = this.get('store'),
			self = this;
		return new Promise(function (resolve, reject) {
			self.get('placesAutocomplete.service').getPlacePredictions(query, function (results, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					if (results && results.length > 0) {
						var filteredResults = results.filter(function (r) {
							return Constants.allowedLocationTypes.indexOf(r.types[0]) > -1;
						});
						var topResult = filteredResults[0];
						var massagedResult = $.extend(topResult, {name: topResult.description});
						var item = self.buildItemInfoFromResults({}, massagedResult);
						var itemRecord = store.peekRecord('item', item.place_id);
						//if it doesn't exist, create it.
						if (!itemRecord) {
							itemRecord = store.createRecord('item', $.extend(item, {id: item.place_id}));
						}
						resolve(itemRecord)
					} else {
						reject({message: 'no results found'});
					}
				} else {
					reject(status);
				}
			});
		});
	},

	buildItemInfoFromResults: function (data, result) {
		//console.log('original item data:', data)
		var item = data;
		// This function reshapes item data into the Ember item model structure
		if (!item.lat && result.geometry) {
			item.lat = result.geometry.location.lat();
			item.lng = result.geometry.location.lng();
		}
		if (result.photos && result.photos.length > 0) {
			item.image = result.photos[0].getUrl({maxWidth: 3000});
			item.image_attribution = result.photos[0].html_attributions[0]
		}
		if (result.types && result.types.length > 0) {
			item.itemType = result.types[0];
		}
		item.place_id = result.place_id;
		item.address = result.formatted_address;
		item.rating = result.rating;
		if (!item.name) item.name = result.name;
		if (!item.id) item.id = result.place_id;
		return item
	}


});