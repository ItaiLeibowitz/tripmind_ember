import Ember from 'ember';
import DS from "ember-data";
import Constants from 'tripmind/appconfig/constants';
import Utils from 'tripmind/appconfig/utils';

export default DS.Model.extend({
	name: DS.attr('string'),
	items: DS.hasMany('item'),
	createdAt: DS.attr('string'),
	updatedAt: DS.attr('string'),

	slug: function(){
		return `${this.get('id')}-${this.get('name')}`;
	}.property('id','name'),

});
