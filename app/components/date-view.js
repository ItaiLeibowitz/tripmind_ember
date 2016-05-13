import Ember from 'ember';
import generateColor from 'tripmind/appconfig/color_generation';
import constants from 'tripmind/appconfig/constants';

export default Ember.Component.extend({
	classNames: ['date-view'],
	attributeBindings: ['backgroundColor:style'],

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
			})['duration'];
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
		}
	}
});