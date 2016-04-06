import Ember from 'ember';

export default Ember.Component.extend({
	mapService: Ember.inject.service('map-service'),
	classNames: ['map-placeholder'],

	didInsertElement: function(){
		Ember.run.scheduleOnce('afterRender', this, 'attachMap');
	},

	willDestroyElement: function(){
		this.detachMap();
	},

	modelDidChange: function(){
		Ember.run.scheduleOnce('afterRender', this, 'attachMap');
	}.observes('model').on('init'),

	attachMap: function(){
		var container = this.$(),
			mapService = this.get('mapService');
		mapService.moveDomToElement(container);
		mapService.changeCenter(this.get('model.lat'), this.get('model.lng'));
		mapService.setProperties({
			draggable: false,
			disableDefaultUI: true,
			bounds: this.get('boundsForMap')
		});
		mapService.set('centerMarkerModel', this.get('model'));
	},

	detachMap: function(){
		var mapService = this.get('mapService'),
			container = $('#original-map-placeholder');
			mapService.moveDomToElement(container);
		mapService.setProperties({
			draggable: true,
			disableDefaultUI: false,
			bounds: this.get('boundsForMap')
		});
	}

});
