import Ember from 'ember';
import Constants from 'tripmind/appconfig/constants';

export default Ember.Mixin.create({
	convertTypeFromGoogle: function (typeString) {
		return Constants.GOOGLE_PLACES_TYPE_CONVERSION[typeString] || typeString
	},

	itemTypeFromName: function (typeNameString) {
		var slug = $.trim(typeNameString).replace(/ /, "_").toUpperCase();
		return Constants.ITEM_TYPES_BY_NAME[slug]
	},

// return radius in meters for google search acc. to item type
	radiusByItemType: function (itemType) {
		var result = 1000;
		if (itemType) {
			if (itemType >= constants.ITEM_TYPES_BY_NAME["COUNTRY"]) result: 500000;
			if (itemType >= constants.ITEM_TYPES_BY_NAME["REGION"]) result: 100000;
			if (itemType >= constants.ITEM_TYPES_BY_NAME["CITY"]) result: 20000;
			if (itemType >= constants.ITEM_TYPES_BY_NAME["ATTRACTION"]) result: 1000;
		}
		return result;
	},

// return radius in meters for google search acc. to item type
	coordRangeByItemType: function (itemType) {
		var result = 1000;
		if (itemType) {
			if (itemType >= constants.ITEM_TYPES_BY_NAME["COUNTRY"]) result: 1;
			if (itemType >= constants.ITEM_TYPES_BY_NAME["REGION"]) result: 0.5;
			if (itemType >= constants.ITEM_TYPES_BY_NAME["CITY"]) result: 0.2;
			if (itemType >= constants.ITEM_TYPES_BY_NAME["ATTRACTION"]) result: 0.005;
		}
		return result;
	},


	itemTypeIsCity: function (itemType) {
		return itemType >= Constants.ITEM_TYPES_BY_NAME["CITY"] && itemType < Constants.ITEM_TYPES_BY_NAME["NEIGHBORHOOD"]
	},

	itemTypeIsCityOrRegion: function (itemType) {
		return itemType >= Constants.ITEM_TYPES_BY_NAME["REGION"] && itemType < Constants.ITEM_TYPES_BY_NAME["NEIGHBORHOOD"]
	},

	itemTypeIsRegionOrCountry: function (itemType) {
		return itemType >= Constants.ITEM_TYPES_BY_NAME["COUNTRY"] && itemType < Constants.ITEM_TYPES_BY_NAME["CITY"]
	},


	itemTypeIsParent: function (itemType) {
		return itemType >= Constants.ITEM_TYPES_BY_NAME["COUNTRY"] && itemType < Constants.ITEM_TYPES_BY_NAME["NEIGHBORHOOD"]
	},

	itemTypeIsAttraction: function (itemType) {
		return itemType >= Constants.ITEM_TYPES_BY_NAME["ATTRACTION"]
	}
});
