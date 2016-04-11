import Ember from "ember";

export default Ember.Service.extend({
	mapService: Ember.inject.service('map-service'),
	mapWidth:300,
	screenWidth: null,

	init: function(){
		this._super();
		this.setScreenWidth();
		var self = this;
		$(window).on('resize.defs', function(){
			self.setScreenWidth();
		});
	},

	setScreenWidth: function(){
		this.set('screenWidth', $(document).innerWidth());
		this.get('mapService').resizeMap();
	},

	actualMapWidth: function(){
		return this.get('mapService.isExpanded') ? this.get('mapWidth') : 0;
	}.property('mapWidth','mapService.isExpanded')
});


