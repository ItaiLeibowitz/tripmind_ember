import Ember from "ember";

export default Ember.Service.extend({
	authenticityToken: null,

	init: function() {
		this.getTokens();
	},

	getTokens: function(){
		var self = this;
		$.get('/tokens', function(results) {
			self.set('authenticityToken', results.token);
		});
	},

	authenticityTokenObserver: function() {
		$.ajaxSetup({
			headers: {
				'X-CSRF-Token': this.get('authenticityToken')
			}
		});
	}.observes('authenticityToken')
});


