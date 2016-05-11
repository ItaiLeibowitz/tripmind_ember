import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['online-only', 'open-tripmind'],

	actions: {
		openExtension: function(){
			this.get('targetObject').send('openExtension', true)
		}
	}

});