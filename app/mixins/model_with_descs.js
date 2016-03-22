import Ember from 'ember';
import DS from 'ember-data';

var ModelWithDescs = Ember.Mixin.create({
	longDesc: DS.attr('string'),
	oneliner: DS.attr('string'),
	altLongDesc: null,
	altOneliner: null,
	longDescOrAlt:  function(){
		return this.get('altLongDesc') || this.get('longDesc');
	}.property('longDesc','altLongDesc'),

	onelinerOrAlt:  function(){
		return this.get('altOneliner') || this.get('oneliner');
	}.property('oneliner','altOneliner'),

	onelinerOrLong: function() {
		if (this.get('onelinerOrAlt')) return this.get('onelinerOrAlt');
		if (this.get('longDescOrAlt')) return this.get('longDescOrAlt').replace(/<(?:.|\n)*?>/gm, '').slice(0,80) + "...";
	}.property('onelinerOrAlt', 'longDescOrAlt')
});

export default ModelWithDescs;