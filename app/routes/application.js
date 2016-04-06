import Ember from "ember";


export default Ember.Route.extend({
	actions: {
		loading: function (transition, originRoute) {
			$('.loader.main-loader').removeClass('hidden');
		},
		stopLoading: function (transition, originRoute) {
			$('.loader.main-loader').addClass('hidden');
		},
		triggerTransition: function(destination, payload) {
			this.transitionTo(destination, payload);
		},
	}
});


