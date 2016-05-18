import Ember from "ember";

export default Ember.Service.extend({
	mapService: Ember.inject.service('map-service'),
	mapWidth:300,
	screenWidth: null,

	init: function(){
		this._super();
		this.setScreenDims();
		var self = this;
		$(window).on('resize.defs', function(){
			self.setScreenDims();
		});
	},

	setScreenDims: function(){
		this.set('screenWidth', $(window).width());
		this.set('screenHeight', $(window).height());
		this.get('mapService').resizeMap();
	},

	actualMapWidth: function(){
		var screenWidth = this.get('screenWidth');
		var mapWidth = screenWidth < 500 ? screenWidth : this.get('mapWidth');
		return this.get('mapService.isExpanded') ? mapWidth : 0;
	}.property('mapWidth','mapService.isExpanded','screenWidth')
});


