import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.route('item', { resetNamespace: true, path: '/items/:item_slug' }, function () {
	});
	this.route('collections');
	this.route('collection', { resetNamespace: true, path: '/collections/:collection_slug' }, function () {
	});
});

export default Router;
