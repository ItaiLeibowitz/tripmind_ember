import Ember from 'ember';
import ENV from 'tripmind/config/environment';



export default Ember.Route.extend({
	beforeModel: function(){
		if (ENV.environment != 'production') {
			this.transitionTo('places');
		}
	}
});
