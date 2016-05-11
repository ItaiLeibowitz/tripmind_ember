import Ember from 'ember';


export default Ember.Component.extend({
	wrappedField: null,
	classNameBindings: ['addedClass'],
	searchService: Ember.inject.service('search-service'),
	results: [],

	actions: {
		clearSearch: function () {
			this.set('wrappedField.query', '');
			this.set('results', null)
		},
		foundItem: function (route, payload) {
			this.send('clearSearch');
			this.sendAction('foundItem', route, payload)
		},
		loading: function(status){
			this.set('loading', status);
		},
		submit: function (query) {
			var self = this;
			this.set('loading', true);
			this.get('wrappedField').$().autocomplete('close');
			this.get('wrappedField').$().blur();
			if (query.length > 0) {
				this.get('searchService').executeQuery(query)
					.then(function (results) {
						self.set('results', results);
						self.set('loading', false)
					});
			}
			ga('send', 'event', 'search', 'collectionSearchFieldSubmit');
		}
	}

});