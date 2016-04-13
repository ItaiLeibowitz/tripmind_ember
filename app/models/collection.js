import Ember from 'ember';
import DS from 'ember-data';
import promiseFromAjax from 'tripmind/appconfig/promise_from_ajax';
import headOnlyPromiseFromAjax from 'tripmind/appconfig/head_only_promise_from_ajax';


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
		var self = this;
		return new Ember.RSVP.Promise(function (resolve, reject) {
			if (self.get('tmToken')) {
				resolve(self.get('tmToken'))
			} else {
				promiseFromAjax({
					url: '/api/tm/tm_collections/',
					type: 'POST'
				}).then(function (result) {
					self.set('tmToken', result.tm_token);
					self.save().then(function () {
						resolve(self.get('tmToken'));
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
					id: this.get('tmToken')
				}
			],
			serializedItems = this.get('items').map(function (item) {
				return {
					id: item.get('id'),
					type: 'item',
					attributes: item.toJSON()
				}
			});
		serializedRecords = serializedRecords.concat(serializedItems);
		var stringifiedRecords = JSON.stringify(serializedRecords);
		var compressedJSON = lzwCompress.pack(stringifiedRecords);
		var compressed = JSON.stringify(compressedJSON).length < stringifiedRecords.length;
		var compressedData = compressed ? compressedJSON : stringifiedRecords;
		return headOnlyPromiseFromAjax({
			url: '/api/tm/tm_collections/' + this.get('tmToken'),
			type: 'PATCH',
			data: {
				tm_collection: {
					is_compressed: compressed,
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
	}

});
