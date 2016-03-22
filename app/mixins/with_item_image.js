import Ember from 'ember';
import Constants from 'tripmind/appconfig/constants';


var WithItemImage = Ember.Mixin.create({
	defaultImageUrl: "",
	defaultImageStyle: "background-color: #000",
	missingImage: Ember.computed.empty('imageProvider'),

	// overwrite these in models

	imageUrl: "",
	imageStyle: "",
	imageProvider: null,

	// for a singular item object

	itemImageUrl: function() {
		var baseUrl = this.get('imageBaseUrl');

		if (baseUrl) {
			if ((this.get('imageProvider') == Constants.WANDERANT_IMAGES) && ((Math.floor(Math.random() * 2)) % 2 == 0)) {
				return baseUrl.replace(Constants.CDN_PATH_1, Constants.CDN_PATH_2);
			} else if (this.get('imageProvider') == Constants.WIKIPEDIA_IMAGES)  {
				var imageName = baseUrl.split("/").pop();
				return baseUrl.replace('commons/','commons/thumb/').replace(imageName, [imageName,"/%@px-",imageName].join(""))
			} else {
				return baseUrl;
			}
		} else if (this.get('googleIcon')) {
			return this.get('googleIcon');
		} else {
			return this.get('defaultImageUrl');
		}
	}.property('imageBaseUrl', 'imageProvider', 'googleIcon'),

	itemImageStyle: function() {
		if ([0, 1, 2, 3, 4, 5, 6, 7].indexOf(this.get('imageProvider')) > -1) {
			return "background-image: url('%@');"
		} else if (this.get('googleIcon')) {
			return "background-image: url('%@'); background-size:71px;"
		} else {
			return this.get('defaultImageStyle');
		}
	}.property('imageProvider', 'googleIcon'),

	// for a list of items

	itemArrayImageUrl: function() {
		return ((this.get('firstItemCalc') && this.get('firstItemCalc.imageUrl')) ? this.get('firstItemCalc.imageUrl') : this.get('defaultImageUrl'));
	}.property('firstItemCalc.imageUrl'),

	itemArrayImageStyle: function() {
		return ((this.get('firstItemCalc') && this.get('firstItemCalc.imageStyle')) ? this.get('firstItemCalc.imageStyle') : this.get('defaultImageStyle'));
	}.property('firstItemCalc.imageStyle'),

	// all

	imageSizeToken: function(sizeName, imageProvider) {
		if (imageProvider == undefined) return "";

		return Constants.IMAGE_PROVIDERS.find(function(provider) {
			return provider.provider_id == imageProvider;
		}).sizes.find(function(size) {
			return size.name == sizeName;
		}).token;
	},


	smallImageUrl: function() {
		return this.get('imageUrl').replace('%@', this.imageSizeToken('small', this.get('imageProvider')));
	}.property('imageUrl', 'imageProvider'),

	mediumImageUrl: function() {
		return this.get('imageUrl').replace('%@',this.imageSizeToken('medium', this.get('imageProvider')));
	}.property('imageUrl', 'imageProvider'),

	largeImageUrl: function() {
		return this.get('imageUrl').replace('%@',this.imageSizeToken('large', this.get('imageProvider')));
	}.property('imageUrl', 'imageProvider'),


	smallImageStyle: function() {
		return Ember.String.htmlSafe(this.get('imageStyle').replace('%@',this.get('smallImageUrl')));
	}.property('imageStyle', 'smallImageUrl'),

	mediumImageStyle: function() {
		return Ember.String.htmlSafe(this.get('imageStyle').replace('%@',this.get('mediumImageUrl')));
	}.property('imageStyle', 'mediumImageUrl'),

	largeImageStyle: function() {
		var output = this.get('imageStyle').replace('%@',this.get('largeImageUrl'));
		// fix for wikipedia images
		if (this.get('imageProvider') == Constants.WIKIPEDIA_IMAGES) {
			var imageName = output.split("/").pop();
			output = output.replace("/" + imageName, "").replace('commons/thumb/','commons/')+"');"
		}
		return Ember.String.htmlSafe(output);
	}.property('imageStyle', 'largeImageUrl'),


	// aliases

	smallImage: Ember.computed.alias('smallImageUrl'),
	mediumImage: Ember.computed.alias('mediumImageUrl'),
	largeImage: Ember.computed.alias('largeImageUrl'),

});

export default WithItemImage;