import Ember from 'ember'
import promiseFromAjax from 'tripmind/appconfig/promise_from_ajax';


export default function(url, requestData) {
	return promiseFromAjax({
		url: url,
		type: 'GET',
		data: requestData,
		dataType: 'html'
	});
};
