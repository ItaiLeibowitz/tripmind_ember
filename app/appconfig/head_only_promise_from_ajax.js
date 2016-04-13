import Ember from 'ember'
import promiseFromAjax from 'tripmind/appconfig/promise_from_ajax';


export default function(ajaxOptions) {
	return promiseFromAjax($.extend(ajaxOptions, {dataType: 'html'}));
};
