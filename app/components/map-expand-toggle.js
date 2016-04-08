import Ember from 'ember';

export default Ember.Component.extend({
	mapService: Ember.inject.service('map-service'),
	classNames: ['map-expand-toggle'],
	classNameBindings: ['isExpanded'],
	isExpanded: Ember.computed.alias('mapService.isExpanded'),

	click: function(){
		this.get('mapService').toggleExpanded();
	}

});
