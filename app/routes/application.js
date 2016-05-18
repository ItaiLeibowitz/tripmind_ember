import Ember from "ember";
import ENV from 'tripmind/config/environment';


export default Ember.Route.extend({
	actions: {
		loading: function (transition, originRoute) {
			$('.loader.main-loader').removeClass('hidden');
		},
		stopLoading: function (transition, originRoute) {
			$('.loader.main-loader').addClass('hidden');
		},
		error: function (transition, originRoute) {
			$('.loader.main-loader').addClass('hidden');
			return this.transitionTo('error');
		},
		triggerTransition: function(destination, payload) {
			this.transitionTo(destination, payload);
		},
		openExtension: function (withCurrentRoute) {
			if (typeof(chrome.runtime) != "undefined") {
				chrome.runtime.sendMessage(ENV.chromeExtensionId, {
					message: "openTripmind",
					addedRoute: withCurrentRoute ? "#" + this.get('router.url') : null
				});
			}
		}
	}
});


