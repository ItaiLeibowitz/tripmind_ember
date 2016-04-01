import Ember from "ember";

export default Ember.Service.extend({
	selectedIds: null,

	init: function() {
		this._super(...arguments);
		this.set('selectedIds', Ember.ArrayProxy.create({content: []}));
	},

	numOfSelected: function(){
		return this.get('selectedIds.length');
	}.property('selectedIds.[]'),

	hasSelected: function(){
		return this.get('numOfSelected') > 0;
	}.property('numOfSelected')
});


