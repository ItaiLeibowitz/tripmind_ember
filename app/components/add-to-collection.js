import Ember from 'ember';

export default Ember.Component.extend({
	collections: null,
	store: Ember.inject.service('store'),
	actionService: Ember.inject.service('action-service'),
	feedbackService: Ember.inject.service('feedback-service'),

	init: function () {
		var self = this;
		this._super();
		this.get('store').findAll('collection').then(function (result) {
			self.set('collections', result.sortBy('updatedAt').reverse());
		})
		ga('send', 'event', 'addToCollection', 'init');
	},


	actions: {
		chooseCollection: function (collection) {
			var currentTime = moment().format("X");
			var self = this,
				selectedIds = this.get('actionService.selectedIds'),
				targetModel = this.get('model'),
				itemsToAdd = targetModel ? [targetModel] : this.get('store').peekAll('item').filter(function (item) {
					return selectedIds.indexOf(item.get('id')) > -1;
				});
			// Create a new collection if there is no input
			if (!collection) {
				collection = this.get('store').createRecord('collection', {
					id: `tmp${Math.random()}`,
					name: "Untitled",
					createdAt: currentTime,
					items: []
				});
			}
			var currentItems = collection.get('items');
				//.then(function (currentItems) {
					currentItems.addObjects(itemsToAdd);
					collection.set('updatedAt', currentTime);
					collection.save();
					itemsToAdd.forEach(function (item) {
						item.save();
					});

					self.get('actionService').clearSelected();
					self.get('closeAction')();
					self.get('feedbackService').setProperties({
						isShowing: true,
						feedbackSentence: "Selection has been added to the collection:",
						feedbackLinkRoute: 'collection',
						feedbackLinkTarget: collection.get('slug'),
						feedbackLinkModel: collection,
						feedbackActionName: null,
						feedbackAddedClass: 'success',
						feedbackDuration: 3000
					});
				//});
			ga('send', 'event', 'addToCollection', 'choseCollection');
			return false;
		}
	}



});