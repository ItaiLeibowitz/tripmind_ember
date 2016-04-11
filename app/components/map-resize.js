import Ember from 'ember';
import Draggable from 'tripmind/mixins/draggable';

export default Ember.Component.extend(Draggable, {
	screenDefService: Ember.inject.service('screen-defs'),
	mapService: Ember.inject.service('map-service'),
	classNameBindings: ['hidden'],
	hidden: Ember.computed.not('mapService.isExpanded'),
	elementId: 'map-resize',
	drag_axis: 'x',

	drag_containment: function(){
		return [ 500, 0, this.get('screenDefService.screenWidth') - 200, 10 ];
	}.property('screenDefService.screenWidth'),

	drag_stop: function(event, ui){
		var newWidth = $(document).innerWidth() - ui.offset.left - 5;
		this.set('screenDefService.mapWidth', newWidth);
		this.get('mapService').resizeMap();
	}


});