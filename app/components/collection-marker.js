import Ember from 'ember';
import gmaps from 'tripmind/appconfig/gmaps';
import MapMarker from 'tripmind/components/map-marker'

export default MapMarker.extend({
	//currentCollection: Ember.inject.service('current-collection'),
	visible: true, //Ember.computed.and('markerListVisible','notSameAsCenter'),
	/*markerListVisible:  Ember.computed.alias('mapService.withAllMarkers'),
	notSameAsCenter: function(){
		return this.get('model.id')!=this.get('mapService.centerMarkerModel.id')
	}.property('model.id','mapService.centerMarkerModel.id'),*/
	map: Ember.computed.alias('mapService.googleMapObject'),
	baseDepth: 2,
	addedLabelClass: null,

	/*collItemsDidChange: function(){
		var isInCollection = this.get('currentCollection.itemIds').indexOf(this.get('model.id')) > -1;
		if (isInCollection) {
			this.setProperties({
				addedLabelClass: 'collection',
				unhoveredIcon: gmaps.markerIcons.smallOrange
			})
		} else {
			this.setProperties({
				addedLabelClass: '',
				unhoveredIcon: gmaps.markerIcons.smallRed
			})
		}
	}.observes('currentCollection.itemIds.[]', 'model.id').on('init'),*/


	lat: Ember.computed.alias('model.lat'),
	lng: Ember.computed.alias('model.lng'),
	labelName: Ember.computed.alias('model.name'),
	labelType: Ember.computed.alias('model.itemTypeName'),
	labelOneliner: Ember.computed.alias('model.onelinerOrAlt'),
	itemImageStyle: Ember.computed.alias('model.photoStyle'),


	centerMarker: function () {
		var map = this.get('map'),
			zoomLevel = map.getZoom(),
			zoomFactor = Math.pow(2, zoomLevel),
			p = map.getProjection(),
			markerPos = this.get('_marker').getPosition(),
			xyOrig = p.fromLatLngToPoint(markerPos),
			xyNew = new google.maps.Point(xyOrig.x + 100 / zoomFactor, xyOrig.y),
			latLngNew = p.fromPointToLatLng(xyNew);
		map.panTo(latLngNew);
	},

	clickMarker: function(e){
		if ($(e.target).hasClass('read-more')) {
			this.openItemMenu();
			//ga('send', 'event', 'marker', 'readMore');
		}
		var currentSetting = this.get('isExpanded');
		if (this.get('minimizeAllAction')) { this.get('minimizeAllAction')()}
		this.set('isExpanded', !currentSetting);
		if (!currentSetting == true) {
			// here we calculate the XY position needed to offset the marker left by half its width, which is 100px
			// change the "100/512" here if the styling of the marker with label changes width
			// 512 is a constant based on google maps tile size
			this.centerMarker();
			//ga('send', 'event', 'marker', 'enlarge');
		}
	},

	updateHoveredState: function(){
		var targetState = this.get('lastHoveredState');
		if (targetState && this.get('minimizeAllAction')) { this.get('minimizeAllAction')()}
		this.set('isExpanded', targetState)
	},

	hoverMarker: function(){
		this.set('lastHoveredState', true);
		Ember.run.debounce(this, 'updateHoveredState', 200)
	},

	unhoverMarker: function(){
		this.set('lastHoveredState', false);
		Ember.run.debounce(this, 'updateHoveredState', 200)
	},


	openItemMenu: function() {
		this.get('mapService').openItemMenu(this.get('model'));
	},

	unhoveredIcon: gmaps.markerIcons.smallRed,
	hoveredIcon: gmaps.markerIcons.invisRed,
});

