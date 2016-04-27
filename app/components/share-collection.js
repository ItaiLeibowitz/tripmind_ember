import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service('store'),
	actionService: Ember.inject.service('action-service'),
	feedbackService: Ember.inject.service('feedback-service'),

	sharedLink: function(){
		return `https://www.tripmind.online/#/collections/${this.get('model.tmToken')}`;
	}.property('model.tmToken'),

	didInsertElement: function () {
		Ember.run.scheduleOnce('afterRender', this, 'sendSharingData');
	},

	sendSharingData: function(){
		var self = this,
			model = this.get('model');
		this.set('loading', true);
		model.getTmToken()
			.then(function (result) {
				if (result.redirect){
					self.get('targetObject').send('triggerTransition', 'collection', result.token);
					self.set('model', result.newModel);
					return result.newModel.postToServer();
				} else {
					return model.postToServer();
				}
			})
			.then(function (result) {
				//TODO: Send the code and codesystem to the collection for storage then on acceptance set loading to false
				self.set('code', result.code);
				self.set('codeSystem', result.compressed);
				self.set('loading', false);
			})
	},


	actions: {
		copyLink: function(){
			var copyTextarea = this.$('.share-input:eq(0)');
			copyTextarea.select();

			try {
				var successful = document.execCommand('copy');
				var msg = successful ? 'successful' : 'unsuccessful';
				var feedbackSentence = successful ? "Link has been copied to clipboard" : "Couldn't copy link",
					feedbackAddedClass = successful ? 'success' : 'failure';
			} catch (err) {
				var feedbackSentence = "Couldn't copy link",
					feedbackAddedClass = 'failure';
			}
			this.get('feedbackService').setProperties({
				isShowing: true,
				feedbackSentence: feedbackSentence,
				feedbackAddedClass: feedbackAddedClass,
				feedbackDuration: 3000
			});
		}
	}



});