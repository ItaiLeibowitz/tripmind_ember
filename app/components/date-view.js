import Ember from 'ember';
import generateColor from 'tripmind/appconfig/color_generation';
import constants from 'tripmind/appconfig/constants';

export default Ember.Component.extend({
	classNames: ['date-view'],
	attributeBindings: ['backgroundColor:style'],
	mapService: Ember.inject.service('map-service'),

	backgroundColor: function(){
		return `border-left: 3px solid ${this.get('model.color')}`;
	}.property('model.color'),

	didInsertElement: function(){
		this._super();
		var model = this.get('model');
		if (!model.get('color')) {
			model.set('color', generateColor(true, 0.99, 0.99));
			model.save();
		}
	},

	prevDate: function(){
		var myOrder = this.get('model.order'),
			orderedDates = this.get('orderedDates');
		if (myOrder == 1) return null;
		var prevDate = orderedDates.find(function(date){
			return date.get('order') == myOrder - 1;
		});
		return prevDate;
	}.property('model.order','orderedDates.[].order'),

	itemsWithPrev: function(){
		var myItems = this.get('model.items'),
			prevDate = this.get('prevDate'),
			items = Ember.ArrayProxy.create({content: []});
		myItems.forEach(function(item){
			items.pushObject(item);
		});
		if (prevDate) {
			var prevItem = prevDate.get('lastItem');
			if (prevItem) items.unshiftObject(prevItem);
		}
		return items;
	}.property('model.items', 'prevDate.lastItem'),

	travelTimeText: function(){
		var totalTravel = this.get('totalTravel');
		if (totalTravel) {
			switch (true) {
				case (totalTravel < 5400):
					var travelTimeText = Math.round(totalTravel / 60) + "m";
					break;
				default:
					var travelTimeText = Math.round(totalTravel / 3600) + "h";
					break;
			}
		}
		return travelTimeText;
	}.property('totalTravel'),

	travelTimeProgress: function(){
		return Math.round(this.get('totalTravel') / 12 / 3600 * 100);
	}.property('totalTravel'),

	totalFun: function(){
		var items = this.get('model.items');
		var totalTime = 0;
		if (!items || !(items.get('length') > 0)) return null;
		items.forEach(function(item){
			var itemDuration = constants.GOOGLE_TYPE_FILTER_CATEGORIES.find(function(el){
				return el.type == item.get('itemType')
			});
			itemDuration = itemDuration ? itemDuration['duration'] : 1800;
			totalTime += itemDuration;
		})
		return totalTime;
	}.property('model.items.[]'),

	funTimeText: function(){
		var totalFun = this.get('totalFun');
		if (totalFun) {
			switch (true) {
				case (totalFun < 5400):
					var funTimeText = Math.round(totalFun / 60) + "m";
					break;
				default:
					var funTimeText = Math.round(totalFun / 3600) + "h";
					break;
			}
		}
		return funTimeText;
	}.property('totalFun'),

	funTimeProgress: function(){
		return Math.round(this.get('totalFun') / 12 / 3600 * 100);
	}.property('totalFun'),

	mapBoundingBox: function() {
		var coordsArray = [],
			bound = 0.001;
		var items = (this.get('itemsWithPrev') || []).toArray();
		items.forEach(function(item){
			var swLat = item.get('boundSwLat') || item.get('lat') - bound;
			var swLng = item.get('boundSwLng') || item.get('lng') - bound;
			var neLat = item.get('boundNeLat')|| item.get('lat') + bound;
			var neLng = item.get('boundNeLng') || item.get('lng') + bound;
			if (swLat && neLng && swLng && neLat) coordsArray.push([swLat, swLng],[neLat, neLng]);
		});
		return this.get('mapService').getBoundingBox(coordsArray);
	}.property('model.items.[].lat','model.items.[].lng'),


	actions: {
		deleteDate: function () {
			var model = this.get('model');
			model.get('collection')
				.then(function (collection) {
					collection.get('items')
						.then(function (collectionItems) {
							model.get('trippoints')
								.then(function (trippoints) {
									var dateItemPromises = trippoints.map(function (tp) {
										return tp.get('item');
									});
									Ember.RSVP.allSettled(dateItemPromises)
										.then(function (array) {
											array.forEach(function (el) {
												var item = el.value;
												collectionItems.addObject(item);
												item.save();
											})
										})
										.then(function () {
											return collection.save();
										})
										.then(function () {
											trippoints.forEach(function (tp) {
												tp.destroy();
												tp.save();
											})
										})
										.then(function () {
											model.destroy();
											model.save();
											collection.reorderDates();
										});
								});
						});
				});
		},
		zoomDate: function(){
			this.set('mapService.bounds', this.get('mapBoundingBox'));
		}
	}
});