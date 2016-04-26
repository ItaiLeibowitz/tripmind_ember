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

					newCollection.save()
						.then(function(){
							attributes.items.forEach(function(item){
								var itemCollections = item.get('collections');
								itemCollections.removeObject(self);
								itemCollections.addObject(newCollection);
								item.save();
							});
						})
						.then(function () {
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
		var self = this,
			linksToSend = Ember.ArrayProxy.create({content: []});
		return this.get('items')
			.then(function (items) {
				var potentialLinkPromises = items.map(function (item) {
					return item.get('potentialLinks');
				});
				return Ember.RSVP.all(potentialLinkPromises)
					.then(function (linkLists) {
						linkLists.forEach(function(list){
							linksToSend.addObjects(list);
						});
						var serializedRecords = [
								{
									attributes: self.toJSON(),
									type: 'collection',
									id: self.get('tmToken'),
									relationships: {
										items: {
											data: items.map(function (item) {
												return {type: 'item', id: item.get('id')}
											})
										}

									}
								}
							],
							serializedItems = items.map(function (item) {
								var potentialLinks = item.get('potentialLinks');
								return {
									id: item.get('id'),
									type: 'item',
									attributes: item.toJSON(),
									relationships: {
										collections: {
											data: [
												{type: 'collection', id: self.get('tmToken')}
											]
										},
										potentialLinks: {
											data: potentialLinks.map(function (link) {
												return {type: 'potentialLink', id: link.get('id')}
											})
										}
									}
								}
							}),
							serializedLinks = linksToSend.map(function (link) {
								return {
									id: link.get('id'),
									type: 'potentialLink',
									attributes: link.toJSON(),
									relationships: {
										item: {
											data: {type: 'item', id: link.get('item.id')}
										}
									}
								}
							});
						serializedRecords = serializedRecords.concat(serializedItems).concat(serializedLinks);
						var stringifiedRecords = JSON.stringify(serializedRecords);
						var compressedJSON = lzwCompress.pack(stringifiedRecords);
						var compressed = JSON.stringify(compressedJSON).length < stringifiedRecords.length;
						var compressedData = compressed ? compressedJSON : stringifiedRecords;
						return headOnlyPromiseFromAjax({
							url: Constants.BASE_SERVER_URL + '/api/tm/tm_collections/' + self.get('tmToken'),
							type: 'PATCH',
							data: {
								tm_collection: {
									is_compressed: compressed,
									last_updated: self.get('updatedAt'),
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
					})
			});
	},

	itemsChange:function(){
		console.log('items changed!')
	}.observes('items.[]')

});
