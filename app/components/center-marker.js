import Ember from 'ember';
import gmaps from 'tripmind/appconfig/gmaps';
import MapMarker from 'tripmind/components/map-marker'

export default MapMarker.extend({
	currentCollection: Ember.inject.service('current-collection'),
	visible: Ember.computed.bool('model.lat'),
	map: Ember.computed.alias('mapService.googleMapObject'),
    baseDepth: 0,
	addedLabelClass: 'center',
	model: Ember.computed.alias('mapService.centerMarkerModel'),
	unhoveredIcon: gmaps.markerIcons.largeRed,

	lat: Ember.computed.alias('model.lat'),
	lng: Ember.computed.alias('model.lng'),
	labelName: Ember.computed.alias('model.name'),
	labelType: Ember.computed.alias('model.itemTypeName'),
	labelOneliner: Ember.computed.alias('model.onelinerOrAlt'),
	itemImageStyle: Ember.computed.alias('model.smallImageStyle'),

	didInsertElement: function(){
		this._super();
		this.get('mapService').set('centerMarker', this);
	},
	willDestroyElement: function(){
		this.get('mapService').set('centerMarker', null);
		this._super();
	},

	clickMarker: function(){
		this.get('mapService').minimizeMap();
	},

	/*collItemsDidChange: function(){
		var isInCollection = this.get('currentCollection.itemIds').indexOf(this.get('model.id')) > -1;
		if (isInCollection) {
			this.setProperties({
				addedLabelClass: 'center collection',
				unhoveredIcon: gmaps.markerIcons.largeOrange
			})
		} else {
			this.setProperties({
				addedLabelClass: 'center',
				unhoveredIcon: gmaps.markerIcons.largeRed
			})
		}
	}.observes('currentCollection.itemIds.[]', 'model.id').on('init'),*/

});

