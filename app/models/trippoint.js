import Ember from 'ember';
import DS from "ember-data";

export default DS.Model.extend({
	date: DS.belongsTo('date'),
	item: DS.belongsTo('item'),
	order: DS.attr('number')

});


