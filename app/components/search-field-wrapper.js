import Ember from 'ember';


export default Ember.Component.extend({
	wrappedField: null,
	searchService: Ember.inject.service('search-service'),
	results: [],

	actions: {
		clearSearch: function () {
			this.set('wrappedField.query', '');
			this.get('targetObject').send('transitionToSearch');
		},
		foundItem: function (route, payload) {
			this.sendAction('foundItem', route, payload)
		},
		submit: function (query) {
			this.get('targetObject').send('loading');
			this.get('wrappedField').$().autocomplete('close');
			var self = this;
			if (query.length > 0) this.get('targetObject').send('transitionToResults', query)
			this.get('wrappedField').$().autocomplete("close");
			this.get('wrappedField').$().blur();
		}
	}

});