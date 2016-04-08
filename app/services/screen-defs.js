import Ember from "ember";

export default Ember.Service.extend({
	mapService: Ember.inject.service('map-service'),
	mapWidth:300,
	actualMapWidth: function(){
		return this.get('mapService.isExpanded') ? this.get('mapWidth') : 0;
	}.property('mapWidth','mapService.isExpanded')
});


