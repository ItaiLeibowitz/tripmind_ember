import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
	location: config.locationType,
	feedbackService: Ember.inject.service('feedback-service'),

	doSomethingOnUrlChange: function () {
		Ember.run.schedule('afterRender', this, 'prepView');
		ga('send', 'pageview', {
			'page': this.get('url'),
			'title': this.get('url')
		});
	}.on('didTransition'),

	// Close any menus, and send a message to applicationRouter to scroll to the appropriate tab
	prepView: function () {
		if (!this.get('feedbackService.persistAfterUrlChange')) {
			this.set('feedbackService.isShowing', false);
		}
		//this.get('mapService').minimizeMap({closeAll: true});
		$('.loader').addClass('hidden');
	}
});

Router.map(function() {
	this.route('item', { resetNamespace: true, path: '/items/:item_slug' }, function () {
	});
	this.route('trash');
	this.route('collections');
	this.route('search', function(){
		this.route('index', {path: '/'});
		this.route('results', {path: '/:query'});
	});
	this.route('recent', { resetNamespace: true, path: '/recent' }, function () {
	});
	this.route('collection', { resetNamespace: true, path: '/collections/:collection_slug' }, function () {
	});
	this.route('error');
});

export default Router;
