import Ember from 'ember'

var EARTH_RADIUS_KM = 6378.137,
	DEG_TO_RAD = Math.PI / 180;

export default function (item1, item2) {
	var lat1 = item1.get('lat') * DEG_TO_RAD,
		lng1 = item1.get('lng') * DEG_TO_RAD,
		lat2 = item2.get('lat') * DEG_TO_RAD,
		lng2 = item2.get('lng') * DEG_TO_RAD;
	var x = ( lng2 - lng1 ) * Math.cos(( lat1 + lat2 ) / 2);
	var y = ( lat2 - lat1 );
	return Math.sqrt(x * x + y * y) * EARTH_RADIUS_KM; // in km
}

