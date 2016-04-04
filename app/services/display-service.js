import Ember from "ember";

export default Ember.Service.extend({
	modalIsOpen: false,
	modalComponentName: null,

	closeTopModal: function() {
		this.setProperties({
			modalIsOpen: false,
			modalComponentName: null,
			model: null
		});
		$('body').removeClass('modal-open');
	},

	actions: {
		openTopModal: function(modalName, model) {
			this.setProperties({
				modalIsOpen: true,
				modalComponentName: modalName.dasherize(),
				model: model
			});
			$('body').addClass('modal-open');
			Ember.run.schedule('afterRender', this, function() {
				$('.top-modal, .modal-dialog').addClass('in');
			});
		},

	}
});


