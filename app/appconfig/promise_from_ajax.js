import Ember from 'ember'

var promiseFromAjax = function(ajaxOptions) {
	return new Ember.RSVP.Promise(function(resolve, reject) {
		$.ajax(ajaxOptions).then(function(results) {
			Ember.run(null, resolve, results);
		}, function(jqXHR) {
			jqXHR.then = null; // tame jQuery's ill mannered promises
			Ember.run(null, reject, jqXHR);
		});
	});
};

export default promiseFromAjax;

