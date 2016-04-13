import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service('store'),
	actionService: Ember.inject.service('action-service'),
	feedbackService: Ember.inject.service('feedback-service'),

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
				}
				return model.postToServer();
			})
			.then(function (result) {
				//TODO: Send the code and codesystem to the collection for storage then on acceptance set loading to false
				self.set('code', result.code);
				self.set('codeSystem', result.compressed);
				self.set('loading', false);
			})
	},


	actions: {
	}



});