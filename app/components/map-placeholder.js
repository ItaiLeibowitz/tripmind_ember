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
		mapService.changeCenter(this.get('model.lat'), this.get('model.lng'));
		mapService.set('centerMarkerModel', this.get('model'));
		mapService.set('minimizedHolder', container);
		if(!mapService.get('isExpanded')) {
			mapService.moveDomToElement(container);
			mapService.setProperties({
				draggable: false,
				disableDefaultUI: true,
				bounds: this.get('boundsForMap')
			});
		}
	},

	detachMap: function(){
		var mapService = this.get('mapService'),
			container = $('#expanded-map');
			mapService.moveDomToElement(container);
		mapService.set('minimizedHolder', null);
		mapService.setProperties({
			draggable: true,
			disableDefaultUI: false,
			bounds: this.get('boundsForMap')
		});
	}

});
