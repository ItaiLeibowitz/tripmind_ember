import Ember from 'ember';
import gmaps from 'tripmind/appconfig/gmaps';

export default Ember.Component.extend({
	mapService: Ember.inject.service('map-service'),
	model: null,


	didInsertElement: function(){
		this._super();
		this.get('mapService').set('collectionMarkers', this);
	},

	willDestroyElement: function(){
		var mapService = this.get('mapService');
		mapService.setProperties({
			collectionMarkers: null,
			bounds: null
		});
		this._super();
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
					this.set('isClicked', false);
				}
			});
			return object;
		});
		return wrappers
	}.property('model.[]'),

	_zoomToModel: function () {
		console.log('zooming map!')
		this.set('mapService.bounds', this.get('mapBoundingBox'));
	}

	, zoomToModel: function(){
		Ember.run.scheduleOnce('afterRender', this, '_zoomToModel');
	}.observes('model.[].lat', 'model.[].lng').on('init'),


	mapBoundingBox: function() {
		var coordsArray = [],
			bound = 0.001;
		var items = (this.get('model') || []).toArray();
		items.forEach(function(item){
			var swLat = item.get('boundSwLat') || item.get('lat') - bound;
			var swLng = item.get('boundSwLng') || item.get('lng') - bound;
			var neLat = item.get('boundNeLat')|| item.get('lat') + bound;
			var neLng = item.get('boundNeLng') || item.get('lng') + bound;
			if (swLat && neLng && swLng && neLat) coordsArray.push([swLat, swLng],[neLat, neLng]);
		});
		return this.get('mapService').getBoundingBox(coordsArray);
	}.property('model.[].lat','model.[].lng'),

	actions: {
		minimizeAllMarkers: function () {
			this.get('markerWrappers').invoke('minimize');
		}
	}


});

