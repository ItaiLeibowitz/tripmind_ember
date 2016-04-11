import Ember from 'ember';
import gmaps from 'tripmind/appconfig/gmaps';

export default Ember.Component.extend({
	mapService: Ember.inject.service('map-service'),
	model: null,


	init: function(){
		this._super();
		this.get('mapService').set('collectionMarkers', this);
		var map = this.get('mapService.mapComponent');
		if (map) {
			console.log('already has map')
		} else {
			console.log('map not ready')
		}
	},

	markerWrappers: function () {
		if (!this.get('model')) {return []};
		var self = this;
		var wrappers = this.get('model').map(function (item, index) {
			var object = Ember.Object.create({ // wrapper object
				item: item,
				hide: function(){
					this.set('visible', false);
				},
				show: function() {
					this.set('visible', true);
				},
				minimize: function() {
					this.set('isExpanded', false);
				}
			});
			return object;
		});
		return wrappers
	}.property('model.[]'),

	actions: {
		minimizeAllMarkers: function () {
			this.get('markerWrappers').invoke('minimize');
		}
	}


});

