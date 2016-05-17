import Ember from 'ember';
import Sortable from 'tripmind/mixins/sortable';

export default Ember.Component.extend({
	didInsertElement: function(){
		this._super();
		var self = this;
		console.log('refreshing!', this.get('parentComponent.elementId'))
		Ember.run.scheduleOnce('afterRender',this,function(){
			self.set('parentComponent.needsRefresh', false);
		});
	}

});