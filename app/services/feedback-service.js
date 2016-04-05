import Ember from 'ember';

export default Ember.Service.extend({
	component: null,
	isShowing: false,

	feedbackSentence: 'This will be the standard sentence',
	feedbackLinkRoute: null,
	feedbackLinkTarget: null,
	feedbackLinkModel: null,
	feedbackActionName: null,
	feedbackAddedClass: null,
	feedbackAction: function () {
		console.log('running the action')
	},

	feedbackDuration: null,

	feedbackIntervalDidChange: function(){
		var duration = this.get('feedbackDuration');
		if (duration){
			Ember.run.later(this, 'hideThenReset', duration);
		}
	}.observes('feedbackDuration'),

	hideThenReset: function(){
		Ember.run.later(this, 'reset', 1500);
		this.set('isShowing', false);
	},

	reset: function(){
		this.setProperties({
			isShowing: false,
			feedbackSentence: null,
			feedbackLinkRoute: null,
			feedbackLinkTarget: null,
			feedbackLinkModel: null,
			feedbackActionName: null,
			feedbackAddedClass: null,
			feedbackDuration: null
		})
	}


});