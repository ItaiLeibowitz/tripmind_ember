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
	}.property(),
	hasExtension: false,
	requiredVersion: 1.0,

	rhsBorderRight: function(){
		if (this.get('service.screenWidth') < 500){
			return 0;
		} else {
			return this.get('mapWidth');
		}

	}.property('mapWidth','service.screenHeight','service.screenWidth'),

	rhsBorderTop: function(){
		if (this.get('service.screenWidth') < 500 && this.get('service.mapService.isExpanded')){
			return this.get('service.screenHeight') * 0.4;
		} else {
			return 0;
		}
	}.property('service.mapService.isExpanded','service.screenHeight','service.screenWidth'),

	didInsertElement: function () {
		var self = this;
		if (typeof(chrome.runtime) != "undefined") {
			chrome.runtime.sendMessage(ENV.chromeExtensionId, { message: "version" },
				function (reply) {
					if (reply && reply.version && reply.version >= self.get('requiredVersion')) {
						self.set('hasExtension', true);
					}
				});

			Ember.run.later(function () {
				self.set('doneCheckExtension', true);
			}, 2000)
		}
	}

});