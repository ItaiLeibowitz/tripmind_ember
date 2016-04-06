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

var promiseFromUrl = function(url, requestData) {
	return promiseFromAjax({
		url: url,
		type: 'GET',
		data: requestData,
		dataType: 'JSON'
	});
};

// Use this for any url that returns an empty head response.
var headOnlyPromiseFromUrl = function(url, requestData) {
	return promiseFromAjax({
		url: url,
		type: 'GET',
		data: requestData,
		dataType: 'html'
	});
};

export default promiseFromUrl;
