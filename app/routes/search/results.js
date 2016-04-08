import Ember from 'ember';



export default Ember.Route.extend({
	searchService: Ember.inject.service('search-service'),
	model: function (params) {
		this.set('query', params.query);
		return this.get('searchService').executeQuery(params.query);
	},
	setupController: function(controller, model){
		this._super(controller, model);
		this.controllerFor('search').set('query', this.get('query'));
	}
});
