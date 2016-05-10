import Ember from 'ember';
import generateColor from 'tripmind/appconfig/color_generation';


export default Ember.Component.extend({
	classNames: ['date-view'],
	attributeBindings: ['backgroundColor:style'],

	backgroundColor: function(){
		return `background-color:${this.get('model.color')}`;
	}.property('model.color'),

	didInsertElement: function(){
		this._super();
		var model = this.get('model');
		if (!model.get('color')) {
			model.set('color', generateColor(true, 0.99, 0.99));
			model.save();
		}
	},

	actions: {
		deleteDate: function () {
			var model = this.get('model');
			model.get('collection')
				.then(function (collection) {
					collection.get('items')
						.then(function (collectionItems) {
							model.get('trippoints')
								.then(function (trippoints) {
									var itemPromises = trippoints.map(function (tp) {
										return tp.get('item');
									});
									Ember.RSVP.allSettled(itemPromises)
										.then(function (array) {
											array.forEach(function (el) {
												collectionItems.addObject(el.value);
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