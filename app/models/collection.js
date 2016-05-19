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
		dates: DS.hasMany('date'),

		slug: function () {
			return `${this.get('id')}-${this.get('name')}`;
		}.property('id', 'name'),

		addDate: function (position) {
			var order = position == "before" ? 0 : 99999,
				self = this;
			this.get('dates')
				.then(function (dates) {
					var date = self.store.createRecord('date', {order: order});
					dates.addObject(date);
					self.reorderDates();
					self.save();
				});
		},

		reorderDates: function () {
			this.get('dates')
				.then(function (dates) {
					var orderedDates = dates.sortBy('order');
					orderedDates.forEach(function (date, idx) {
						date.set('order', idx + 1);
						date.save();
					})
				})
		},

		orderedDates: function () {
			return this.get('dates').sortBy('order');
		}.property('dates.[].order'),

		getTmToken: function () {
			var self = this,
				store = this.store;
			return new Ember.RSVP.Promise(function (resolve, reject) {
				if (self.get('tmToken')) {
					resolve({});
				} else {
					promiseFromAjax({
						url: Constants.BASE_SERVER_URL + '/api/tm/tm_collections/',
						type: 'POST'
					}).then(function (result) {
						self.set('tmToken', result.tm_token);
						// Here we replace the collection with a new copy that has the tmToken as its id as well
						var attributes = self.serialize();
						attributes.items = attributes.items.map(function (id) {
							return store.peekRecord('item', id);
						});
						attributes.dates = attributes.dates.map(function (id) {
							return store.peekRecord('date', id);
						});
						var newCollection = store.createRecord('collection', $.extend(attributes, {id: result.tm_token, tmToken: result.tm_token}));

						newCollection.save()
							.then(function () {
								attributes.items.forEach(function (item) {
									var itemCollections = item.get('collections');
									itemCollections.removeObject(self);
									itemCollections.addObject(newCollection);
									item.save();
								});
								attributes.dates.forEach(function (date) {
									date.set('collection', newCollection);
									date.save();
								});
							})
							.then(function () {
								self.destroyRecord();
								resolve({
									token: self.get('tmToken'),
									redirect: true,
									newModel: newCollection
								});
							}, function () {
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
				linksToSend = Ember.ArrayProxy.create({content: []}),
				trippointsToSend = Ember.ArrayProxy.create({content: []}),
				dateItemsToSend = Ember.ArrayProxy.create({content: []});
			return this.get('items')
				.then(function (items) {
					var visitedLinkPromises = items.map(function (item) {
						return item.get('potentialLinks')
							.then(function (links) {
								return links.filter(function (link) {
									return link.get('lastVisited') > 0
								})
							});
					});
					return Ember.RSVP.allSettled(visitedLinkPromises)
						.then(function (array) {
							array.forEach(function (el) {
								if (el.state == 'fulfilled') linksToSend.addObjects(el.value);
							});
							return self.get('dates')
								.then(function (dates) {
									var trippointPromises = dates.map(function (date) {
										return date.get('trippoints');
									});
									return Ember.RSVP.allSettled(trippointPromises)
										.then(function (tpPromiseArray) {
											tpPromiseArray.forEach(function (el) {
												if (el.state == 'fulfilled') trippointsToSend.addObjects(el.value);
											});
											var dateItemPromises = trippointsToSend.map(function (tp) {
												return tp.get('item')
											});
											return Ember.RSVP.allSettled(dateItemPromises)
												.then(function (dateItemsArray) {
													dateItemsArray.forEach(function (el) {
														if (el.state == 'fulfilled') dateItemsToSend.addObject(el.value);
													});
													return dateItemsToSend;
												})
											.then(function(dateItemsToSend) {
													var allItemAncestorIds = items.toArray().concat(dateItemsToSend.toArray()).reduce(function(pv, item){
														var ancestorArray = item.get('ancestry');
														ancestorArray = ancestorArray ? ancestorArray.split("/") : [];
														return pv.concat(ancestorArray);
													},[]).uniq();
													return self.store.findAll('item')
														.then(function(allItemRecords){
														    var ancestorItems = allItemRecords.filter(function(item){
																return allItemAncestorIds.indexOf(item.get('id')) > -1;
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
																	var potentialLinks = item.get('potentialLinks').filter(function (link) {
																		return link.get('lastVisited') > 0
																	});
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
																}),
																serializedDates = dates.map(function(date){
																	var tps = date.get('trippoints');
																	return {
																		id: date.get('id'),
																		type: 'date',
																		attributes: date.toJSON(),
																		relationships: {
																			collection: {
																				data: {type: 'collection', id: self.get('id')}
																			},
																			trippoints:  {
																				data: tps.map(function (tp) {
																					return {type: 'trippoint', id: tp.get('id')}
																				})
																			}
																		}
																	}
																}),
																serializedTrippoints =  trippointsToSend.map(function(tp){
																	return {
																		id: tp.get('id'),
																		type: 'trippoint',
																		attributes: tp.toJSON(),
																		relationships: {
																			date: {
																				data: {type: 'date', id: tp.get('date.id')}
																			},
																			item: {
																				data: {type: 'item', id: tp.get('item.id')}
																			}
																		}
																	}
																}),
																serializedDateItems =  dateItemsToSend.map(function(item){
																	var tps = item.get('trippoints');
																	return {
																		id: item.get('id'),
																		type: 'item',
																		attributes: item.toJSON(),
																		relationships: {
																			trippoints: {
																				data: tps.map(function (tp) {
																					return {type: 'trippoint', id: tp.get('id')}
																				})
																			}
																		}
																	}
																}),
																serializedAncestors =  ancestorItems.map(function(item){
																	return {
																		id: item.get('id'),
																		type: 'item',
																		attributes: item.toJSON()
																	}
																});



															serializedRecords = serializedRecords
																.concat(serializedItems)
																.concat(serializedLinks)
																.concat(serializedDates)
																.concat(serializedTrippoints)
																.concat(serializedDateItems)
																.concat(serializedAncestors);
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
													.catch(function(error){
															console.log('couldnt find all items', error)
														})

												})
												.catch(function (error) {
													console.log('couldnt find all dateItems', error)
												})
										})
										.catch(function (error) {
											console.log('couldnt find all trippoints', error)
										})
								})
								.catch(function (error) {
									console.log('couldnt find all dates', error)
								})
						})
						.catch(function (error) {
							console.log('couldnt find all links', error)
						})
				});
		},

		itemsChange: function () {
			console.log('items changed!')
		}.observes('items.[]'),

		allItems: function(){
			var allItems = Ember.ArrayProxy.create({content: []});
			allItems.addObjects(this.get('items'));
			this.get('dates').forEach(function(date){
				allItems.addObjects(date.get('items'));
			});
			return allItems;
		}.property('items.[]','dates.[].items')

	});
