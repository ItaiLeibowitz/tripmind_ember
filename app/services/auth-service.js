import Ember from "ember";
import Constants from 'tripmind/appconfig/constants';

export default Ember.Service.extend({
	authenticityToken: null,

	init: function() {
		this.getTokens();
	},

	getTokens: function(){
		var self = this;
		$.get(Constants.BASE_SERVER_URL + '/tokens', function(results) {
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


