import Ember from 'ember';
import Widget from 'tripmind/mixins/widget';


export default Ember.Mixin.create(Widget, {
	uiTypes: [],
	// we are not using all the autocomplete options and each one gets an observer above
	// therefore we only include here options that we need to set
	autocompleteUiOptions: ['autocomplete_minLength', 'autocomplete_appendTo','autocomplete_autoFocus',
		'autocomplete_delay', 'autocomplete_disabled', 'autocomplete_minLength', 'autocomplete_position',
		'autocomplete_source', 'autocomplete_service', 'autocomplete_emberobj'],
	autocompleteUiEvents: ['autocomplete_change','autocomplete_close','autocomplete_create',
		'autocomplete_focus','autocomplete_open', 'autocomplete_response','autocomplete_search','autocomplete_select'],

	init: function () {
		this._super();
		this.set('uiTypes', this.get('uiTypes').concat('autocomplete'));
	}
});