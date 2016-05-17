import Ember from "ember";
import Utils from 'tripmind/appconfig/utils';
import promiseFromAjax from 'tripmind/appconfig/promise_from_ajax';
import Constants from 'tripmind/appconfig/constants';


export default Ember.Route.extend({
	model: function (params) {
		var itemId = params.item_slug.split('+')[0],
			store = this.get('store');
		return store.findRecord('item', itemId)
			.then(function (itemRecord) {
				return itemRecord.get('potentialLinks').then(function(links){
					console.log('loaded the links', links)
					itemRecord.notifyPropertyChange('potentialLinks.[].lastVisited');
				}, function (s) {
					console.log('didnt load links', s)
				}).then(function () {
					return store.findAll('item').then(function (items) {
						var descendants = items.filter(function (i) {
							return i.get('trackingStatus') && i.get('ancestry') && i.get('ancestry').indexOf(itemRecord.get('path')) == 0 && !i.get('isTemporary');
						});
						if (itemRecord.get('canHaveChildren') || Constants.GOOGLE_PLACE_DESTINATION_TYPES.indexOf(itemRecord.get('itemType')) > -1) {
							return promiseFromAjax({
								url: Constants.BASE_SERVER_URL + '/api/ember2/items/gmaps_recs/',
								type: 'GET',
								data: {ref: itemId}
							}).then(function (results) {
								if (results.data) {
									var recs = Ember.ArrayProxy.create({content: []});
									results.data.forEach(function (result) {
										if (store.hasRecordForId('item', result.attributes['gmaps-reference'])) {
											var newItem = store.peekRecord('item', result.attributes['gmaps-reference'])
											recs.addObject(newItem);
										} else {
											var updatedAttributes = {};
											for (var key in result.attributes) {
												if (result.attributes.hasOwnProperty(key)) {
													updatedAttributes[key.camelize()] = result.attributes[key];
												}
											}
											updatedAttributes.ancestry = itemRecord.get('path');
											updatedAttributes.ancestryNames = itemRecord.get('pathNames');
											updatedAttributes.itemType = Constants.ITEM_TYPES_ARRAY[updatedAttributes.itemType] ?
												Constants.ITEM_TYPES_ARRAY[updatedAttributes.itemType].name : 'attraction';
											updatedAttributes.isTemporary = true;
											updatedAttributes.lat = updatedAttributes.latitude;
											updatedAttributes.lng = updatedAttributes.longitude;
											var newTempName = "tmp" + result.attributes['ancestry-names'] + "/" + result.attributes.name;
											newTempName = newTempName.replace(/[\s\/]/g,"-");

											var itemAttribs = {
												data: {
													attributes: updatedAttributes,
													id: result.attributes['gmaps-reference'] || newTempName,
													type: 'item'
												}
											}
											var newItem = store.push(itemAttribs)
											newItem.set('image', newItem.get('mediumImageUrl'));
											recs.addObject(newItem);
										}
									})
									recs.removeObjects(descendants);
								}
								return Ember.Object.create({
									item: itemRecord,
									descendants: descendants,
									recs: recs
								})
							})
						} else {
							return Ember.Object.create({
								item: itemRecord,
								descendants: descendants,
								recs: []
							})
						}
					});
				});
			});
	},
	serialize: function(model) {
		return { item_path: model.get('item.path').replace(/[\/\s]/g,"_") };
	},
	setupController: function(controller, model){
		this._super(controller, model.get('item'));
		controller.setProperties({
			descendants: model.get('descendants'),
			recs: model.get('recs')
		});
	}
});


