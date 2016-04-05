import Ember from 'ember';
import gmaps from 'tripmind/appconfig/gmaps';

export default Ember.Service.extend({
	constantOptions: {
		mapTypeControl: false,
		zoom: 3,
		maxZoom: 19,
		minZoom: 2,
		noClear: true,
		mapTypeControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		streetViewControl: false,
		//styles: gmaps.styles.originalStyles[0]
	},
	withAllMarkers: false,
	mapComponent: null,
	centerMarker: null,
	centerLat: 34.851939,
	centerLng: -82.399752,
	zoom: 15,
	draggable: true,
	disableDefaultUI: false,
	bounds: {swLat: -1, swLng: -1, neLat: 1, neLng: 1},
	lastHolder: null,

	center: function(){
		return new window.google.maps.LatLng(
			this.get('centerLat'),
			this.get('centerLng')
		)
	}.property('centerlLat', 'centerLng'),

	options: function(){
		return $.extend(this.get('constantOptions'), {
			center: this.get('center'),
			zoom: this.get('zoom'),
			draggable: this.get('draggable'),
			disableDefaultUI: this.get('disableDefaultUI')
		});
	}.property('center','zoom', 'draggable', 'disableDefaultUI'),

	moveDomToElement: function(elem){
		$('#actual-map').appendTo(elem);
		var map = this.get('mapComponent.googleMapObject');
		google.maps.event.trigger(map, 'resize');
	},

	changeCenter: function(lat, lng){
		this.setProperties({
			centerLat: lat,
			centerLng: lng
		});
	},
	expandMap: function(currentElem){
		this.set('lastHolder', currentElem);
		this.set('lastItemCardPosition', this.get('currentItem.isOpen'));
		this.set('lastCurrentItem', this.get('currentItem.item'));
		this.set('currentItem.isOpen', false);
		this.set('withAllMarkers', true)
		$('#actual-map').appendTo('#expanded-map');
		$('#expanded-map').addClass('is-expanded');
		this.get('mapComponent').resizeMap();
		this.setProperties({
			draggable: true,
			disableDefaultUI: false
		})
	},
	minimizeMap: function(options){
		var closeAll = options ? options.closeAll : false;
		if (this.get('lastHolder')) {$('#actual-map').appendTo(this.get('lastHolder'));}
		this.get('currentItem').setProperties({
			isOpen: closeAll ? false : this.get('lastItemCardPosition'),
			item: this.get('lastCurrentItem'),
			withMap: true,
			withPhoto: false
		});
		this.set('withAllMarkers', false);
		this.get('mapComponent').resizeMap();
		$('#expanded-map').removeClass('is-expanded');
		this.setProperties({
			draggable: false,
			disableDefaultUI: true,
			bounds: this.get('bounds')
		})
	},

	openItemMenu: function(model){
		var currentItem = this.get('currentItem');
		currentItem.setProperties({
			item: model,
			isOpen: true,
			withMap: false,
			withPhoto: true,
			isAd: this.get('isAd'),
			currentListCard: null
		});
	},

	mapBoundingBox: function() {
		var coordsArray = [],
			bound = 0.001;
		var items = (this.get('markerItems') || []).toArray();
		items.forEach(function(item){
			var swLat = item.get('boundSwLat') || item.get('lat') - bound;
			var swLng = item.get('boundSwLng') || item.get('lng') - bound;
			var neLat = item.get('boundNeLat')|| item.get('lat') + bound;
			var neLng = item.get('boundNeLng') || item.get('lng') + bound;
			if (swLat && neLng && swLng && neLat) coordsArray.push([swLat, swLng],[neLat, neLng]);
		});
		return this.getBoundingBox(coordsArray);
	}.property('markerItems.[].lat','markerItems.[].lng'),

	getBoundingBox: function (coordsArray) {
		if (coordsArray.length > 0) {
			var D_WRAP_LNG = 180;
			var minLat = coordsArray[0][0],
				maxLat = coordsArray[0][0],
				minLng = coordsArray[0][1],
				maxLng = coordsArray[0][1];
			for (var i = 0; i < coordsArray.length; i++) {
				var coords = coordsArray[i];
				// Fix the longitudinal wrapping if in a country where there is discontinuity in coords (e.g., Mexico)
				if (coords[1] - minLng > D_WRAP_LNG)coords[1] -= 360;
				if (coords[1] - minLng < -D_WRAP_LNG) coords[1] += 360;

				if (coords[0] < minLat) minLat = coords[0];
				if (coords[0] > maxLat) maxLat = coords[0];
				if (coords[1] < minLng) minLng = coords[1];
				if (coords[1] > maxLng) maxLng = coords[1];
			}
			return {swLat: minLat, swLng: minLng, neLat: maxLat, neLng: maxLng};

		} else {
			return false;
		}
	},

});