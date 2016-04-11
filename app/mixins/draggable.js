import Ember from 'ember'
import Widget from 'tripmind/mixins/widget';


export default Ember.Mixin.create(Widget, {
	uiTypes: [],
	// we are not using all the draggable options and each one gets an observer above
	// therefore we only include here options that we need to set
	draggableUiOptions: ['drag_appendTo', 'drag_axis', 'drag_containment', 'drag_cursorAt', 'drag_delay',
		'drag_helper', 'drag_handle', 'drag_revert', 'drag_revertDuration', 'drag_zIndex', 'drag_disabled'],
	draggableUiEvents: ['drag_drag', 'drag_start', 'drag_stop'],

	init: function () {
		this._super();
		this.set('uiTypes', this.get('uiTypes').concat('draggable'));
	}
});
