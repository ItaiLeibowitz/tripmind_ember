import Ember from 'ember';
import sectionMixin from 'tripmind/mixins/section-mixin';

export default Ember.Component.extend(sectionMixin, {
	store: Ember.inject.service('store'),
	classNames:['sub-section'],

	mouseEnter: function(){
		if (this.get('model.count')) return;
		var item = this.get('store').peekRecord('item', this.get('model.slug').split("+")[0]);
		item.set('isHovered', true);
	},
	mouseLeave: function(){
		if (this.get('model.count')) return;
		var item = this.get('store').peekRecord('item', this.get('model.slug').split("+")[0]);
		item.set('isHovered', false);
	},
});