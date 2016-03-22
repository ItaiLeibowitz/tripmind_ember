import Ember from 'ember';
import Constants from 'tripmind/appconfig/constants';

var Utils = {};


Utils.itemTypeIsParent = function (itemType) {
	return itemType >= Constants.ITEM_TYPES_BY_NAME["COUNTRY"] && itemType < Constants.ITEM_TYPES_BY_NAME["NEIGHBORHOOD"]
};

Utils.itemTypeIsAttraction = function (itemType) {
	return itemType >= Constants.ITEM_TYPES_BY_NAME["ATTRACTION"];
};

Utils.itemTypeIsCountry = function (itemType) {
	return itemType <= Constants.ITEM_TYPES_BY_NAME["COUNTRY"];
};

Utils.itemTypeIsRegion = function (itemType) {
	return itemType <= Constants.ITEM_TYPES_BY_NAME["REGION"];
};

export default Utils;
