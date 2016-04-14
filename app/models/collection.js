import Ember from 'ember';
import DS from 'ember-data';
import promiseFromAjax from 'tripmind/appconfig/promise_from_ajax';
import headOnlyPromiseFromAjax from 'tripmind/appconfig/head_only_promise_from_ajax';
import Constants from 'tripmind/appconfig/constants';


export default
DS.Model.extend({
	name: DS.attr('string'),
	items: DS.hasMany('item'),
	tmToken: DS.attr('string'),
	createdAt: DS.attr('string'),
	updatedAt: DS.attr('string'),

	slug: function () {
		return `${this.get('id')}-${this.get('name')}`;
	}.property('id', 'name'),

	getTmToken: function () {
		var self = this,
			store = this.store;
		return new Ember.RSVP.Promise(function (resolve, reject) {
			if (self.get('tmToken')) {
				resolve({token: self.get('tmToken')});
			} else {
				promiseFromAjax({
					url: Constants.BASE_SERVER_URL + '/api/tm/tm_collections/',
					type: 'POST'
				}).then(function (result) {
					self.set('tmToken', result.tm_token);
					// Here we replace the collection with a new copy that has the tmToken as its id as well
					var attributes = self.serialize();
					attributes.items = attributes.items.map(function(id){
						return store.peekRecord('item', id);
					});
					var newCollection = store.createRecord('collection', $.extend(attributes, {id: result.tm_token, tmToken: result.tm_token}));

					newCollection.save().then(function () {
						self.destroyRecord();
						resolve({
								token: self.get('tmToken'),
								redirect: true
							});
					}, function() {
						reject('could not save')
					});
				}, function (status) {
					reject(status)
				});
			}
		});
	},

	postToServer: function () {
		var self = this;
		var serializedRecords = [
				{
					attributes: this.toJSON(),
					type: 'collection',
					id: this.get('tmToken'),
					relationships: {
						items: {
							data: this.get('items').map(function(item){return {type: 'item', id: item.get('id')}})
						}

					}
				}
			],
			serializedItems = this.get('items').map(function (item) {
				return {
					id: item.get('id'),
					type: 'item',
					attributes: item.toJSON(),
					relationships: {
						collections: {
							data: [
								{type: 'collection', id: self.get('tmToken')}
							]
						}
					}
				}
			});
		serializedRecords = serializedRecords.concat(serializedItems);
		var stringifiedRecords = JSON.stringify(serializedRecords);
		var compressedJSON = lzwCompress.pack(stringifiedRecords);
		var compressed = JSON.stringify(compressedJSON).length < stringifiedRecords.length;
		var compressedData = compressed ? compressedJSON : stringifiedRecords;
		return headOnlyPromiseFromAjax({
			url: Constants.BASE_SERVER_URL + '/api/tm/tm_collections/' + this.get('tmToken'),
			type: 'PATCH',
			data: {
				tm_collection: {
					is_compressed: compressed,
					last_saved: this.get('updatedAt'),
					data: compressedData
				}
			}
		}).then(function () {
			console.log("resolve: ", compressedData)
			return compressedData
		}, function (status) {
			console.log('reject:', status)
			return status
		});
	},

	itemsChange:function(){
		console.log('items changed!')
	}.observes('items.[]')

});
