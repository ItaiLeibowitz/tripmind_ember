import Ember from 'ember';

export default Ember.Controller.extend({
   displayService: Ember.inject.service('display-service'),

	actions: {
		toggleModal: function(){
			this.get('displayService').closeTopModal();
		}
	}
});