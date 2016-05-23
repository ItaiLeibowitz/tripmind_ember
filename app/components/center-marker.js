import Ember from 'ember';
import gmaps from 'tripmind/appconfig/gmaps';
import MapMarker from 'tripmind/components/map-marker'

export default MapMarker.extend({
	currentCollection: Ember.inject.service('current-collection'),
	visible: Ember.computed.bool('model.lat'),
	map: Ember.computed.alias('mapService.googleMapObject'),
    baseDepth: 0,
	addedLabelClass: 'center',
	unhoveredIcon: Ember.computed.alias('centerIcon'),
	hoveredIcon: Ember.computed.alias('centerIcon'),

	centerIcon: function(){
		return this.get('draggable') ? gmaps.markerIcons.largeGreen : gmaps.markerIcons.largeRed;
	}.property('draggable'),

	lat: Ember.computed.alias('model.lat'),
	lng: Ember.computed.alias('model.lng'),
	labelName: Ember.computed.alias('model.name'),
	labelType: Ember.computed.alias('model.itemTypeName'),
	labelOneliner: Ember.computed.alias('model.onelinerOrAlt'),
	itemImageStyle: Ember.computed.alias('model.photoStyle'),

	didInsertElement: function(){
		this._super();
		this.get('mapService').set('centerMarker', this);
	},
	willDestroyElement: function(){
		this.get('mapService').set('centerMarker', null);
		this._super();
	},

	clickMarker: function(){
		$('body').animate({scrollTop: 0}, 200);
	},

	actions: {
		toggleDraggable: function(preventSave){
			if (!this.get('draggable')) {
				this.setProperties({
					oldLat: this.get('model.lat'),
					oldLng: this.get('model.lng')
				})
			}
			if (!this.get('model.lat')) this.get('model').setProperties({lat:1, lng: 1})
			console.log('toddle drag: ', this.get('draggable'))
			this.toggleProperty('draggable');
			//Save if we just moved it
			if (preventSave){
				this.get('model').setProperties({
					lat: this.get('oldLat'),
					lng: this.get('oldLng')
				})
			}
			if (!this.get('draggable')){
				this.get('model').save();
			}
		}
	}

});

