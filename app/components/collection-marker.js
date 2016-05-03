import Ember from 'ember';
import gmaps from 'tripmind/appconfig/gmaps';
import MapMarker from 'tripmind/components/map-marker'

export default MapMarker.extend({
	visible: true,
	map: Ember.computed.alias('mapService.googleMapObject'),
	baseDepth: 2,
	addedLabelClass: null,


	lat: Ember.computed.alias('model.lat'),
	lng: Ember.computed.alias('model.lng'),
	labelName: Ember.computed.alias('model.name'),
	labelType: Ember.computed.alias('model.itemTypeName'),
	labelOneliner: Ember.computed.alias('model.onelinerOrAlt'),
	itemImageStyle: Ember.computed.alias('model.photoStyle'),

	// here we calculate the XY position needed to offset the marker left by half its width, which is 100px
	// change the "100/2^zoomlevel" here if the styling of the marker with label changes width
	centerMarker: function (centerYToo) {
		var map = this.get('map'),
			zoomLevel = map.getZoom(),
			zoomFactor = Math.pow(2, zoomLevel),
			p = map.getProjection(),
			markerPos = this.get('_marker').getPosition(),
			currentCenterXy = p.fromLatLngToPoint(map.getCenter()),
			xyOrig = p.fromLatLngToPoint(markerPos),
			xyNew = new google.maps.Point(xyOrig.x + 100 / zoomFactor, centerYToo ? xyOrig.y : currentCenterXy.y),
			latLngNew = p.fromPointToLatLng(xyNew);
		map.panTo(latLngNew);
	},

	clickMarker: function(e){
		// If we clicked on the area around the read-more
		// (This is determined by click offset because the click itself is registered on an image w/o access to the button

		// First we find the original event
		var originalEvent;
		for (var key in e){
			if (e.hasOwnProperty(key)){
				if (e[key] && e[key].isTrusted)
					originalEvent = e[key]
			}
		}

		if (originalEvent.offsetX >= 120 && originalEvent.offsetX <= 220 && originalEvent.offsetY >= 180 && originalEvent.offsetY <= 220) {
			console.log('going to item!', this.get('model.name'))
			this.get('targetObject.targetObject.targetObject').send('triggerTransition', 'item', this.get('model.slug'));
			ga('send', 'event', 'marker', 'readMore');
		}
		var currentSetting = this.get('isClicked');
		/*if (this.get('minimizeAllAction')) { this.get('minimizeAllAction')()}
		*/
		this.set('isExpanded', !currentSetting);
		this.set('isClicked', !currentSetting);
		if (!currentSetting) {

			this.centerMarker();
			ga('send', 'event', 'marker', 'enlarge');
		}
		return false;
	},

	updateHoveredState: function(){
		if (this.get('isClicked')) return;
		var targetState = this.get('lastHoveredState');
		if (targetState) {
			if (this.get('minimizeAllAction')) { this.get('minimizeAllAction')()}
			this.centerMarker();
		}
		this.set('isExpanded', targetState)
	},

	hoverMarker: function(){
		this.set('lastHoveredState', true);
		Ember.run.debounce(this, 'updateHoveredState', 300)
	},

	unhoverMarker: function(){
		this.set('lastHoveredState', false);
		Ember.run.debounce(this, 'updateHoveredState', 300)
	},



	unhoveredIcon: gmaps.markerIcons.smallRed,
	hoveredIcon: gmaps.markerIcons.invisRed,
	itemHoveredIcon: gmaps.markerIcons.largeBlue,

});

