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
		var itemTypeName = this.get('itemType');
		var parentName = this.get('parentName');

		if (parentName) {
			return itemTypeName + ' in ' + parentName;
		} else {
			return itemTypeName;
		}
	}.property('itemTypeName', 'parentName'),

	path: function(){
		var ancestryNames = this.get('ancestryNames');
		if (ancestryNames && ancestryNames.length > 0 ){
			return `${ancestryNames}/${this.get('name')}`;
		} else {
			return this.get('name');
		}
	}.property('ancestryNames', 'name')

});
