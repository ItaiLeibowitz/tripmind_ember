import Ember from 'ember';

export default Ember.Mixin.create({
	parentName: function() {
		var names = this.get('ancestryNames');
		if (names && names.length > 0) {
			names = names.split("/");
			return names[names.length - 1];
		} else {
			return false
		}
	}.property('ancestryNames'),


	itemTypeInParent: function() {
		var itemTypeName = this.get('itemTypeClean');
		var parentName = this.get('parentName');

		if (parentName) {
			return itemTypeName + ' in ' + parentName;
		} else {
			return itemTypeName;
		}
	}.property('itemTypeClean', 'parentName'),


	path: function(){
		var ancestry = this.get('ancestry');
		if (ancestry && ancestry.length > 0 ){
			return `${ancestry}/${this.get('id')}`;
		} else {
			return this.get('id');
		}
	}.property('ancestry', 'id'),

	pathNames: function(){
		var ancestryNames = this.get('ancestryNames');
		if (ancestryNames && ancestryNames.length > 0 ){
			return `${ancestryNames}/${this.get('name')}`;
		} else {
			return this.get('name');
		}
	}.property('ancestryNames', 'name'),

	/*ancestorsArray: function () {
		var ancestryNames = this.get('ancestryNames'),
			response = [];
		if (ancestryNames && ancestryNames.length > 0) {
			var ancestryNamesArray = ancestryNames.split("/");
			response = ancestryNamesArray.map(function (el, i) {
				return {target: 'item', name: ancestryNamesArray[i], slug: ancestryNamesArray.slice(0,i+1).join("_"), offsetClass: `offset-${i + 1}`}
			});
		}
		var ancestryLength = response.length;
		response.push({target: 'item', name: this.get('name'), slug: this.get('slug'), offsetClass: `offset-${ancestryLength + 1} is-selected`});
		return response;
	}.property('ancestryNames', 'name', 'slug'),*/

	ancestorsArray: function(){
		var ancestry = this.get('ancestry'),
			ancestryNames = this.get('ancestryNames'),
			response = [];
		if (ancestry && ancestry.length > 0) {
			var ancestryArray = ancestry.split("/"),
				ancestryNamesArray = ancestryNames.split("/");
			response = ancestryArray.map(function(el, i){
				return {target: 'item', name: ancestryNamesArray[i], slug: `${el}+${ancestryNamesArray[i]}`,offsetClass: `offset-${i + 1}`}
			});
		}
		var ancestryLength = response.length
		response.push({target: 'item', name: this.get('name'), slug: this.get('slug'), offsetClass:`offset-${ancestryLength + 1} is-selected`});
		return response;
	}.property('ancestry','ancestryNames','name','slug'),

});
