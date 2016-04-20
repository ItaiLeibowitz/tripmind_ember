import Ember from 'ember';
import DS from "ember-data";
import WithItemImage from 'tripmind/mixins/with_item_image';
import WithAncestry from 'tripmind/mixins/with_ancestry';
import ModelWithDescs from 'tripmind/mixins/model_with_descs';
import Constants from 'tripmind/appconfig/constants';
import Utils from 'tripmind/appconfig/utils';

var Item = DS.Model.extend(WithItemImage, WithAncestry, ModelWithDescs, {
	name: DS.attr('string'),
	category: DS.attr('string'),
	captionName: DS.attr('string'),
	captionLink: DS.attr('string'),
	captionCc: DS.attr('string'),
	image: DS.attr('string'),
	address: DS.attr('string'),
	ancestry: DS.attr('string'),
	ancestryDepth: DS.attr('number'),
	ancestryNames: DS.attr('string'),
	duration: DS.attr('number', {defaultValue: 3600}),
	lat: DS.attr('number'),
	lng: DS.attr('number'),
	boundSwLat: DS.attr('number'),
	boundSwLng: DS.attr('number'),
	boundNeLat: DS.attr('number'),
	boundNeLng: DS.attr('number'),
	userId: DS.attr('number'),
	itemType: DS.attr('string'),
	googleHours: DS.attr(),
	externalLinks: DS.attr(),
	phone: DS.attr('string'),
	rating: DS.attr('number', {defaultValue: 3}),
	source: DS.attr('string'),
	price: DS.attr('string'),
	openingHoursText: DS.attr('string'),
	topItems: DS.attr('number'),
	isHighlight: DS.attr('boolean', {defaultValue: false}),
	canHaveChildren: DS.attr('boolean'),
	hasSuggestedTrips: DS.attr('boolean'),
	isEditLocked: DS.attr('boolean', {defaultValue: false}),
	collections: DS.hasMany('collection'),
	//trip: DS.belongsTo('trip', {inverse: 'items'}),
	//potentialTrip: DS.belongsTo('trip', {inverse: 'potentialItems'}),
	parent: DS.belongsTo('item'),
	gmapsReference: DS.attr('string'),
	isGoogle: DS.attr('boolean', {defaultValue: false}),
	isHidden: DS.attr('boolean', {defaultValue: false}),
	additionalInfoComplete: DS.attr('boolean', {defaultValue: false}),
	needsWikiContent: DS.attr('boolean'),
	needsFullGoogleInfo: DS.attr('boolean'),
	imageBaseUrl: DS.attr('string'),
	imageProvider: DS.attr('number'),
	reviewDigest: DS.attr('number'),
	googleResultOrder: DS.attr('number'),
	googleTypes: DS.attr(),
	ancestryObject: DS.attr(),
	parentOptions: DS.attr(),
	recentlyUpdated: DS.attr('boolean', {defaultValue: false}),
	trackingStatus: DS.attr('boolean', {defaultValue: true}),
	trippointsCount: DS.attr('number'),
	destinationRoute: 'item.overview',
	isTemporary: DS.attr('boolean', {defaultValue: false}),
	updatedAt: DS.attr('string'),

	itemDetailsService:Ember.inject.service('item-details-service'),


	deletedStatus: Ember.computed.not('trackingStatus'),

	updatedAtRecently: function(){
		return moment(this.get('updatedAt'), "X").startOf('day').calendar(null, {
			sameDay: '[Today]',
			nextDay: '[Tomorrow]',
			nextWeek: 'dddd',
			lastDay: '[Yesterday]',
			lastWeek: 'MM/DD',
			sameElse: 'MM/DD'
		})
	}.property('updatedAt'),

	updatedAtDate: function(){
		return moment(this.get('updatedAt'), "X").format('MM/DD/YYYY')
	}.property('updatedAt'),

	itemTypeClean: function(){
		var itemType = this.get('itemType');
		return itemType ? itemType.replace(/_/g," ") : null;
	}.property('itemType'),

	operatingHours: function(){
		var googleHours = this.get('googleHours');
		if (googleHours) {
			return this.convertGoogleHours(googleHours);
		} else {
			return this.get('operatingHoursText')
		}
	}.property('googleHours', 'operatingHoursText'),



	imageUrl: Ember.computed.alias('itemImageUrl'),
	imageStyle: Ember.computed.alias('itemImageStyle'),

	photoStyle: function(){
		if (this.get('image')) {
			return Ember.String.htmlSafe(`background-image: url(${this.get('image')})`);
		} else {
			var colorLength = Constants.FLAT_DESIGN_COLORS.length,
				color = Constants.FLAT_DESIGN_COLORS[Math.floor(Math.random()*colorLength)];
			return Ember.String.htmlSafe(`background-image: url('assets/images/background-pattern.png'); background-color: ${color};`);
		}
	}.property('image'),

	details: function(){
		var details = [],
			detailNames = ['address', 'phone'];
		for (var i = 0; i < detailNames.length; i++) {
			var name = detailNames[i];
			if (this.get(name)){
				details.push({
					name: name.capitalize(),
					value: this.get(name)
				})
			}
		}
		return details
	}.property('address', 'phone', 'operatingHours'),

	itemTypeName: function(){
		return Constants.ITEM_TYPES_ARRAY[this.get('itemType')] ? Constants.ITEM_TYPES_ARRAY[this.get('itemType')].name.capitalize() : 'Attraction';
	}.property('itemType'),

	slug: function(){
		var name = this.get('name');
		return [this.get('id').toString(), name ? name.toLowerCase() : ""].join(' ').replace(/ /g, '+');
	}.property('id', 'name'),

	reviewedByArray: function(){
		var reviewDigest = this.get('reviewDigest');
		if (!reviewDigest) return;
		var reviewsArray = reviewDigest.toString(2).split("").reverse();
		return reviewsArray.map(function(el, index){
			return el == 1 ? {class: "review_source_" + index} : null;
		}).compact()
	}.property('reviewDigest'),


	getAdditionalItemInfo: function(){
		console.log('getting more info for ', this.get('name'))
		this.get('itemDetailsService').getAdditionalItemInfo(this.get('id'))
	},

	isRegion: function(){
		 return Utils.itemTypeIsRegion(this.get('itemType'));
	}.property('itemType'),


	websiteLink: function(){
		var links = this.get('externalLinks');
		if (links && links.length > 0) {
			return links[0]["source"];
		}
	}.property('externalLinks'),

	mapLink: function(){
		return `http://maps.google.com/maps?daddr=${this.get('lat')},${this.get('lng')}&amp;ll=`;
	}.property('lat', 'lng'),

	phoneLink: function(){
			return `tel:${this.get('phone')}`;
	}.property('phone'),

	convertGoogleHours: function (periods) {
		if (periods) {
			var nextDayIndex = function (dayIndex) {
				return (dayIndex + 1) % 7
			};


			var prevDayIndex = function (dayIndex) {
				return (dayIndex + 6) % 7
			};

			var daysBetween = function (startDayIndex, endDayIndex) {
				if (startDayIndex > endDayIndex) {
					var currentIndex = startDayIndex,
						result = [];
					while (currentIndex != prevDayIndex(endDayIndex)) {
						currentIndex = nextDayIndex(currentIndex);
						result.push(currentIndex);
					}
					return result;
				} else {
					var array = new Array(endDayIndex - startDayIndex + 1);
					for (var i = 0; i < array.length; i++) {
						array[i] = startDayIndex + i;
					}
					return array
				}
			};

			var parseTimestring = function (timestring) {
				return parseInt(timestring.slice(0, 2)) * 3600 + parseInt(timestring.slice(2, 4)) * 60
			};

			// local constants
			var startOfDaySeconds = 0,
				endOfDaySeconds = 86400,
				allDayPeriod = [0, 86400];

			// Don't calculate anything if there are no periods
			if (!periods || periods.length == 0) {
				return null;
			}

			//periods = JSON.parse(periods) if periods.class.name == "String"

			// Open 24/7
			if (periods.length == 1 && periods[0].open.time == "0000" && undefined === periods[0].close) {
				var array = new Array(7);
				for (var i = 0; i < array.length; i++) {
					array[i] = [allDayPeriod];
				}
				return array
			}

			//Use this version of Array.new so that all values don't reference the same object
			var result = new Array(7);
			for (var i = 0; i < result.length; i++) {
				result[i] = [];
			}

			periods.forEach(function (period) {


				var dayIndexOpen = period.open.day,
					dayIndexClose = period.close.day;

				var timeOpenSeconds = parseTimestring(period.open.time),
					timeCloseSeconds = parseTimestring(period.close.time);
				//open and close on the same day
				if (dayIndexOpen == dayIndexClose) {
					result[dayIndexOpen].push([timeOpenSeconds, timeCloseSeconds])
					// don't open and close on the same day. Example: Bar opens at 16:00 and closes at 04:00 the next day
				} else {
					result[dayIndexOpen].push([timeOpenSeconds, endOfDaySeconds]);
					if (timeCloseSeconds > startOfDaySeconds) {
						result[dayIndexClose].push([startOfDaySeconds, timeCloseSeconds]);
					}

					// if difference between open and close is more than 1 day, set days between as open 24 hours
					if (nextDayIndex(dayIndexOpen) != dayIndexClose) {
						daysBetween(dayIndexOpen, dayIndexClose).forEach(function (dayIndex) {
							result[dayIndex] = [allDayPeriod]
						});
					}
				}
			});
			return result
		} else {
			return null;
		}
	},

	secondsToTime: function(seconds) {
		var date = new Date(seconds * 1000);
		var hours = date.getUTCHours(); // returns 0 for both 00:00 and 24:00
		var minutes = date.getUTCMinutes();
		var suffix = (hours >= 12) ? "PM" : "AM";

		if (hours == 0) hours = 12;
		if (hours > 12) hours -= 12;

		//hours = ["0", hours].join("").slice(-2);
		minutes = ["0", minutes].join("").slice(-2);

		return (minutes > 0) ? [hours, ':', ["0", minutes].join("").slice(-2), suffix].join("") : [hours,suffix].join("");
	},

	textOperatingHours: function() {
		var operatingHours = this.get('operatingHours');

		if (operatingHours && operatingHours.length == 7) {
			var dayNames;

			if (operatingHours.isUniform()) {
				operatingHours = [operatingHours[0]];
				dayNames = ["Every day"];
			} else {
				operatingHours = operatingHours.rotate();
				dayNames = Constants.DAY_NAMES.rotate();
			}

			var result = [];

			for (var i = 0; i < operatingHours.length; i++) {
				var title = dayNames[i];
				var periods = operatingHours[i];
				var resultPeriods = [];

				for (var j = 0; j < periods.length; j++) {
					var period = periods[j];
					var startTime = this.secondsToTime(period[0]);
					var endTime = this.secondsToTime(period[1]);
					var resultPeriod = (startTime == endTime) ? "Open 24 hours" : [startTime, ' - ', endTime].join("");

					resultPeriods[j] = { period: resultPeriod };
				}

				result[i] = { title: title, periods: resultPeriods.length ? resultPeriods : [{period: 'Closed'}] };
			}

			return result;
		} else {
			return [];
		}
	}.property('operatingHours'),


});

export default Item;
