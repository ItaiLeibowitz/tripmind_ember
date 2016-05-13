import Ember from 'ember';
import DS from "ember-data";

export default DS.Model.extend({
	date: DS.attr('string'),
	order: DS.attr('number'),
	collection: DS.belongsTo('collection'),
	trippoints: DS.hasMany('trippoint'),
	color: DS.attr('string'),

	title: function(){
		var date = this.get('date');
		if (date){
			return moment(date, "X").format('MM/DD/YYYY');
		} else {
			return `Day ${this.get('order')}`
		}
	}.property('order', 'date'),


	items: Ember.computed('trippoints.[].item', {
		// The get function is on purpose NOT a promise so it can be used in templates."use strict";
		// The route has to make sure that we are loading all the items correctly.
		get(key) {
			return this.get('trippoints')
				.filter(function (tp) {
					return tp.currentState.stateName.indexOf('deleted') == -1
				})
				.sortBy('order')
				.map(function (tp) {
					return tp.get('item')
				})
			/*var self = this;
			return new Ember.RSVP.Promise(function(resolve, reject) {
				self.get('trippoints').then(function (tps) {
					var itemPromises = tps
						.filter(function (tp) {
							return tp.currentState.stateName.indexOf('deleted') == -1
						})
						.sortBy('order').map(function (tp) {
							return tp.get('item')
						});
					Ember.RSVP.allSettled(itemPromises)
						.then(function (array) {
							var response = array.map(function (el) {
								if (el.state == 'fulfilled')return el.value;
							});
							resolve(response);
						})
				});
			});*/
		}, set(key, value) {
			var self = this;
			var currentTps = this.get('trippoints');
			currentTps.forEach(function(trippoint){
				if (trippoint.currentState.stateName.indexOf('inFlight') == -1) trippoint.destroyRecord();
			});
			var newItems = value.map(function(item, idx){
				var trippoint = self.store.createRecord('trippoint',{order: idx, item: item, date: self});
				trippoint.save();
				item.save();
				return item;
			})
			return newItems;
		}
	}),


	firstItem: function(){
		return this.get('items.firstObject');
	}.property('items.[]'),

	lastItem: function(){
		return this.get('items.lastObject');
	}.property('items.[]')


});


