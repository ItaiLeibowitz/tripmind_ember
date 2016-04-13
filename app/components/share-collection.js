import Ember from 'ember';

export default
Ember.Component.extend({
	store: Ember.inject.service('store'),
	actionService: Ember.inject.service('action-service'),
	feedbackService: Ember.inject.service('feedback-service'),

	didInsertElement: function () {
		var self = this,
			model = this.get('model');
		this.set('loading', true);
		model.getTmToken()
			.then(function (tmToken) {
				return model.postToServer();
			}).then(function(result){
				//TODO: Send the code and codesystem to the collection for storage then on acceptance set loading to false
				self.set('code', result.code);
				self.set('codeSystem', result.compressed);
				self.set('loading', false);
			})
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
				collection = this.get('store').createRecord('collection', {name: "Untitled", createdAt: currentTime});
			}
			collection.get('items').addObjects(itemsToAdd).then(function (results) {
				collection.set('updatedAt', currentTime);
				collection.save();
				console.log('collection:', collection.toJSON())
				console.log(lzwCompress.pack(collection.toJSON()))
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
			})
		}
	}



});