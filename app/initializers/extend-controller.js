import Ember from 'ember';


export function initialize(application){
	Ember.Controller.reopen({
		displayService: Ember.inject.service('display-service')
	})


};


export default {
	name: 'extend-controller',
	initialize: initialize
};