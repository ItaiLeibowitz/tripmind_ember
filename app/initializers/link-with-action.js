import Ember from 'ember';


export function initialize(application){
	Ember.LinkComponent.reopen({
		_sendInvokeAction() {
			this.sendAction('invokeAction');
		},

		didInitAttrs() {
			this._super(...arguments);

			// Map desired event name to invoke function
			const eventName = this.get('eventName');

			if (this.get('invokeAction')) {
				this.on(eventName, this, this._sendInvokeAction);
			}

		},

		willDestroyElement() {
			if (this.get('invokeAction')) {
				this.off(this.get('eventName'), this, this._sendInvokeAction);
			}
		}
	})


};


export default {
	name: 'link-with-action',
	initialize: initialize
};