import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['distance-leg'],
	classNameBindings: ['travelClass'],

	walkingTimeMins: function(distance){
		return Math.round(distance / 5000 * 60);
	},

	travelClass: function(){
		if (!this.get('model')) return null;
		return this.get('model.distance') < 1500 ? 'icon-walk' : 'icon-drive';
	}.property('model.distance'),

	displayText: function(){
		var distance = this.get('model.distance'),
			driveTime = this.get('model.driveTime');
		if (distance < 1500 ) {
			return `${this.walkingTimeMins(distance)} min walk`
		} else if (driveTime < 600 ){
			return `${Math.round(driveTime / 60)} min drive or ${this.walkingTimeMins(distance)} min walk`

		} else if (driveTime < 3600 ){
			return `${Math.round(driveTime / 60)} min drive`

		} else {
			return `${Math.round(driveTime / 1800) / 2} hr drive`
		}
	}.property('model.distance','model.driveTime')
});