import Ember from 'ember';
import ItemCard from 'tripmind/components/item-card';
import geoDistance from 'tripmind/appconfig/geo_distance';

export default ItemCard.reopen({
	classNames: ['temporary'],
	persistRecord: false,
	store: Ember.inject.service('store'),

	closestDistance: function(){
		var fromItems = this.get('fromItems'),
			item = this.get('model');
		if (!fromItems || fromItems.get('length') == 0) return null;
		var minDistance = 99999,
			minItem = null;
			fromItems.forEach(function(otherItem){
				var distance = geoDistance(item, otherItem);
				if (distance < minDistance) {
					minDistance = distance;
					minItem = otherItem;
				}
			});
		var distanceText, distanceTime, travelClass;
		switch (true) {
			case (minDistance == 0):
				if (this.get('model.name') == minItem.get('name')) {
					distanceText = `Already in collection`;
				} else {
					distanceText = `Next to  ${minItem.get('name')}`;
				}
				break;
			case (minDistance < 0.1):
			distanceTime = Math.round(minDistance / 5 * 60);
			distanceText = `Next to  ${minItem.get('name')}`;
			travelClass = "icon-walk";
			break;

			case (minDistance < 1):
				distanceTime = Math.round(minDistance  / 5 * 60);
				distanceText = `${distanceTime}min from ${minItem.get('name')}`;
				travelClass = "icon-walk";
				break;
			case (minDistance < 75):
				distanceTime = Math.max(1, Math.round(minDistance / 50 * 6)) * 10;
				distanceText = `${distanceTime}min from  ${minItem.get('name')}`;
				travelClass = "icon-drive";
				break;
			case (minDistance < 300):
				distanceTime = Math.round(minDistance / 50);
				distanceText = `about ${distanceTime}hrs from ${minItem.get('name')}`;
				travelClass = "icon-drive";
				break;
			default:
				distanceTime = Math.round(minDistance / 50);
				distanceText = 'Too far, take a flight!';
				travelClass = "icon-fly";
				break;
		}
		return Ember.Object.create({item: minItem, distance: minDistance, distanceText: distanceText, travelClass: travelClass});
	}.property('model.lat', 'fromItems.[].lat'),





	willDestroyElement: function(){
		if (this.get('persistRecord')){
			this.get('model').set('isTemporary', false);
			this.get('model').getAdditionalItemInfo();
		} else if (this.get('model.isTemporary')){
			this.get('model').destroyRecord();
		}
		this._super();
	},

	actions: {
		persistItem: function () {
			this.set('persistRecord', true);
		},
		selectAction: function(type, itemSlug){
			this.set('persistRecord', true);
			this.get('selectAction')(type, itemSlug);
		}
	}


});