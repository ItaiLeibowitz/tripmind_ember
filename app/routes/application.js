import Ember from "ember";


export default Ember.Route.extend({
	actions: {
		triggerTransition: function(destination, payload) {
			this.transitionTo(destination, payload);
		},
	}
});


