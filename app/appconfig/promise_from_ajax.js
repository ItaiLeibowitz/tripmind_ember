import Ember from 'ember'

var promiseFromAjax = function(ajaxOptions) {
	return new Ember.RSVP.Promise(function(resolve, reject) {
		$.ajax(ajaxOptions).then(function(results) {
			resolve(results);
		}, function(jqXHR) {
			jqXHR.then = null; // tame jQuery's ill mannered promises
			reject(jqXHR);
		});
	});
};

export default promiseFromAjax;

