import Ember from 'ember';



export default Ember.Route.extend({
	actions: {
		transitionToSearch: function(query){
			this.transitionTo('search.index');
		},
		transitionToResults: function(query){
			this.transitionTo('search.results', query);
		}
	}
});
