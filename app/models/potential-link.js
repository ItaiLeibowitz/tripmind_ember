import Ember from 'ember';
import DS from "ember-data";

export default DS.Model.extend({
	itemId: DS.attr('string'),
	createdAt: DS.attr('string'),
	lastVisited: DS.attr('string'),
	note: DS.attr('string'),
	image: DS.attr('string'),
	title: DS.attr('string'),
	description: DS.attr('string'),

	noteOrDesc: function(){
		return this.get('note') || this.get('description');
	}.property('note', 'description'),

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


