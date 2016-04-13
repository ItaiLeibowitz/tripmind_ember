import Ember from 'ember';

export default Ember.Component.extend({
	service: Ember.inject.service('auth-service'),

	didInsertElement: function(){
		this.get('service.authenticityToken');
	}
});