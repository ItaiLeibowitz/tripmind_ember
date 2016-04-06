import Ember from 'ember'

// Create a new mixin for jQuery UI widgets using the Ember
// mixin syntax.
var Widget = Ember.Mixin.create({
	// call this method to set up the widget
	// IL: best if not done on every didInsertElement to save useless effort
	// e.g. when cards are still moving about.
	setupWidget: function() {
		this._super();
		if (!this.get('widgetIsUp')) {

			var self = this;
			this.get('uiTypes').forEach(function (uiType) {
				// Make jQuery UI options available as Ember properties
				var options = self._gatherOptions(uiType);

				// Make sure that jQuery UI events trigger methods on this view.
				self._gatherEvents(uiType, options);

				// Create a new instance of the jQuery UI widget based on its `uiType`
				// and the current element.
				self._createWidget(uiType, options);
			});
			this.set('widgetIsUp', true);
		}
	},

	didInsertElement: function() {
		this._super();
		this.get('controller').send('flagWidgetSetupNeeded', this)
	},


	destroyWidget: function() {
		var hasWidget = this.get('widgetIsUp');

		if (hasWidget) {
			// Tear down any observers that were created to make jQuery UI
			// options available as Ember properties.
			var observers = this._observers;
			for (var prop in observers) {
				if (observers.hasOwnProperty(prop)) {
					this.removeObserver(prop, observers[prop]);
				}
			}
			var self = this;
			this.get('uiTypes').forEach(function(uiType) {
				self._destroyData(self, uiType);
			});
		}
		this.set('widgetIsUp', false);

	},

	// When Ember tears down the view's DOM element, it will call
	// this method.
	willDestroyElement: function() {
		this._super();
		this.destroyWidget();
	},

	// Each jQuery UI widget has a series of options that can be configured.
	// For instance, to disable a button, you call
	// `button.options('disabled', true)` in jQuery UI. To make this compatible
	// with Ember bindings, any time the Ember property for a
	// given jQuery UI option changes, we update the jQuery UI widget.
	_gatherOptions: function(uiType) {
		var uiOptions = this.get( uiType + 'UiOptions'), options = {};
		var self = this;

		// The view can specify a list of jQuery UI options that should be treated
		// as Ember properties.
		//
		// we use uiType_* for option names - e.g., draggable_grid
		uiOptions.forEach(function(key) {
			var jQkey = key.split('_')[1];
			options[jQkey] = this.get(key);

			// TODO: split this so we only set observers on some properties, and others are
			// just set up front
			//
			// Set up an observer on the Ember property. When it changes,
			// call jQuery UI's `option` method to reflect the property onto
			// the jQuery UI widget.
			var observer = function() {
				var value = this.get(key);
				self._setOption(this, uiType, jQkey, value);
			};

			this.addObserver(key, observer);

			// Insert the observer in a Hash so we can remove it later.
			this._observers = this._observers || {};
			this._observers[key] = observer;
		}, this);

		return options;
	},

	// Each jQuery UI widget has a number of custom events that they can
	// trigger. For instance, the progressbar widget triggers a `complete`
	// event when the progress bar finishes. Make these events behave like
	// normal Ember events. For instance, a subclass of JQ.ProgressBarView
	// could implement the `complete` method to be notified when the jQuery
	// UI widget triggered the event.
	_gatherEvents: function(uiType, options) {
		var uiEvents = this.get(uiType + 'UiEvents') || [], self = this;

		uiEvents.forEach(function(eventName) {
			var callback = self[eventName];

			if (callback) {
				// You can register a handler for a jQuery UI event by passing
				// it in along with the creation options. Update the options hash
				// to include any event callbacks.
				//
				// we use uiType_* for event names - e.g., draggable_start
				options[eventName.split('_')[1]] = function(event, ui) { callback.call(self, event, ui); };
			}
		});
	},

	// Some jquery widgets are functions, while others are objects. Based on this:
	// http://stackoverflow.com/questions/10435266/getting-jquery-uis-datepicker-widget-as-a-emberjs-mixin-to-work
	_createWidget: function(uiType, options) {
		if (typeof $.ui[uiType] === 'function') {
			$.ui[uiType](options, this.$());
		} else { // "object"
			this.$()[uiType](options);
		}
	},

	// Widgets that are functions have a "data", while ones that are objects don't
	// We use the data to bind options or destroy the widgets

	_setOption: function(element, uiType, key, value) {
		var uiData = element.$().data('ui'+uiType.capitalize());
		if (uiData && (typeof uiData.option === 'function')) {
			uiData.option(key, value);
		} else {
			element.$()[uiType]("option", key, value);
		}
	},

	_destroyData: function(element, uiType) {
		var uiData = element.$().data('ui'+uiType.capitalize());
		if (uiData && (typeof uiData.destroy === 'function')) {
			uiData.destroy();
		} else {
			element.$()[uiType]("destroy");
		}
	}

});


var Autocomplete = Ember.Mixin.create(Widget, {
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

export default Widget;
export default Autocomplete;