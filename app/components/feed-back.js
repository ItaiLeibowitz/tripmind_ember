import Ember from 'ember';

export default Ember.Component.extend({
	feedbackService: Ember.inject.service('feedback-service'),
	classNames: ['feedback'],
	classNameBindings: ['isShowing', 'feedbackAddedClass'],
	isShowing: Ember.computed.alias('feedbackService.isShowing'),

	feedbackSentence: Ember.computed.alias('feedbackService.feedbackSentence'),
	feedbackActionName: Ember.computed.alias('feedbackService.feedbackActionName'),
	feedbackLinkRoute: Ember.computed.alias('feedbackService.feedbackLinkRoute'),
	feedbackLinkTarget: Ember.computed.alias('feedbackService.feedbackLinkTarget'),
	feedbackLinkModel: Ember.computed.alias('feedbackService.feedbackLinkModel'),
	feedbackAddedClass: Ember.computed.alias('feedbackService.feedbackAddedClass'),

	didInsertElement: function () {
		this.get('feedbackService').set('component', this);
		this._super()
	},

	actions: {
		callAction: function(){
			if (this.get('feedbackService.feedbackAction')){
				this.get('feedbackService.feedbackAction')();
			}
		},
		dismiss: function(){
			this.set('feedbackService.isShowing', false);
		}
	}

});