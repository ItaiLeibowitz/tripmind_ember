import Ember from 'ember';
import DS from 'ember-data';
import betterSanitize from 'tripmind/appconfig/better_sanitize';

var ModelWithDescs = Ember.Mixin.create({
	longDesc: DS.attr('string'),
	oneliner: DS.attr('string'),
	altLongDesc: null,
	altOneliner: null,
	longDescOrAlt:  function(){
		return this.get('altLongDesc') || this.get('longDesc');
	}.property('longDesc','altLongDesc'),

	onelinerOrAlt:  function(){
		return this.get('altOneliner') || this.get('oneliner') || this.get('itemTypeInParent');
	}.property('oneliner','altOneliner','itemTypeInParent'),

	onelinerOrLong: function() {
		if (this.get('longDescOrAlt')) return Ember.String.htmlSafe(this.get('longDescOrAlt').replace(/<(?:.|\n)*?>/gm, '').slice(0,80) + "...");
		if (this.get('onelinerOrAlt')) return this.get('onelinerOrAlt');
	}.property('onelinerOrAlt', 'longDescOrAlt'),

	longDescEditable: Ember.computed('longDesc', {
		get(key) {
			return Ember.String.htmlSafe(this.get('longDesc'));
		}, set(key, value){
			this.set('longDesc', betterSanitize(value));
			return Ember.String.htmlSafe(value);
		}
	})
});

export default ModelWithDescs;