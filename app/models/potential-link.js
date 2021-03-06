import Ember from 'ember';
import DS from "ember-data";
import Constants from 'tripmind/appconfig/constants';

export default DS.Model.extend({
	createdAt: DS.attr('string'),
	lastVisited: DS.attr('string'),
	note: DS.attr('string'),
	image: DS.attr('string'),
	title: DS.attr('string'),
	description: DS.attr('string'),
	item: DS.belongsTo('item'),

	noteOrDesc: Ember.computed('note', 'description', {
		get(key) {
			return Ember.String.htmlSafe(this.get('note') || this.get('description'));
		}, set(key, value){
			this.set('note', value);
			return Ember.String.htmlSafe(value);
		}
	}),

	domain: function(){
		var a = $('<a>', { href:this.get('id') } )[0];
		return a.hostname;
	}.property("id"),

	photoStyle: function(){
		if (this.get('image')) {
			return Ember.String.htmlSafe(`background-image: url(${this.get('image')})`);
		} else {
			var colorLength = Constants.FLAT_DESIGN_COLORS.length,
				color = Constants.FLAT_DESIGN_COLORS[Math.floor(Math.random()*colorLength)];
			return Ember.String.htmlSafe(`background-image: url('assets/images/background-pattern.png'); background-color: ${color};`);
		}
	}.property('image'),

});


