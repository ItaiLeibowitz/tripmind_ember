import Ember from 'ember';
import ENV from 'tripmind/config/environment';

export default Ember.Component.extend({
	service: Ember.inject.service('screen-defs'),
	mapWidth: Ember.computed.alias('service.actualMapWidth'),
	barRightWidth: function(){
		return Math.max(this.get('mapWidth'), 48);
	}.property('mapWidth'),
	// Hide all editing elements on the online version
	hideEditing: function(){
		return (ENV.environment === 'production');
	},
	hasExtension: false,
	requiredVersion: 1.0,

	didInsertElement: function () {
		var self = this;
		chrome.runtime.sendMessage(ENV.chromeExtensionId, { message: "version" },
			function (reply) {
				if (reply && reply.version && reply.version >= self.get('requiredVersion')) {
					self.set('hasExtension', true);
				}
			});
		Ember.run.later(function(){
			self.set('doneCheckExtension', true);
		}, 2000)
	}

});