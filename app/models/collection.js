import Ember from 'ember';
import DS from "ember-data";
import Constants from 'tripmind/appconfig/constants';
import Utils from 'tripmind/appconfig/utils';

export default DS.Model.extend({
	name: DS.attr('string'),
	items: DS.hasMany('item'),
});
