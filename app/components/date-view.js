import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['date-view'],

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
										});
								});
						});
				});
		}
	}
});