import Ember from 'ember';


export default Ember.Component.extend({
	wrappedField: null,
	searchService: Ember.inject.service('search-service'),
	results: [],

	actions: {
		clearSearch: function () {
			this.set('wrappedField.query', '');
			this.set('results', []);
		},
		foundItem: function (route, payload) {
			this.sendAction('foundItem', route, payload)
		},
		submit: function (query) {
			this.get('targetObject').send('loading');
			this.get('wrappedField').$().autocomplete('close');
			var self = this;
			this.get('searchService').executeQuery(query)
				.then(function (results) {
					self.get('targetObject').send('stopLoading');
					self.set('results', results);
					self.get('wrappedField').$().autocomplete("close");
					self.get('wrappedField').$().blur();
				})
		}
	}

});