import Ember from "ember";
import Utils from 'tripmind/appconfig/utils';


export default Ember.Route.extend({
	model: function () {
		return this.get('store').findAll('collection');
	}
});


