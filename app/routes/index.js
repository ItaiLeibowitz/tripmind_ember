import Ember from 'ember';



export default Ember.Route.extend({
	model: function(){
		var store = this.get('store');
		return store.peekAll('item')
	},
	setupController: function(controller, model){
		var countries = model.filter(function(item){
			return item.get('itemType') == "country"
		});
		var regions = model.filter(function(item){
			return item.get('itemType') == "administrative_area_level_1"
		});
		var cities = model.filter(function(item){
			return item.get('itemType') == "locality"
		});
		controller.setProperties({
			countries: countries,
			regions: regions,
			cities: cities
		})
	}
});
