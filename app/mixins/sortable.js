import Ember from 'ember'
import Widget from 'tripmind/mixins/widget';

export default Ember.Mixin.create(Widget, {
	uiTypes: [],
	// we are not using all the resizable options and each one gets an observer above
	// therefore we only include here options that we need to set
	sortableUiOptions: ['sortable_appendTo', 'sortable_axis', 'sortable_items',
		'sortable_handle','sortable_connectWith'],
	sortableUiEvents: ['sortable_start','sortable_stop','sortable_update','sortable_sort', 'sortable_remove', 'sortable_over', 'sortable_out'],


	init: function () {
		this._super();
		this.set('uiTypes', this.get('uiTypes').concat('sortable'));

	}
});