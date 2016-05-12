import Ember from 'ember';
import Sortable from 'tripmind/mixins/sortable';

export default Ember.Component.extend({
	didInsertElement: function(){
		this._super();
		console.log('refreshing!', this.get('parentComponent.elementId'))
		this.set('parentComponent.needsRefresh', false);
	}

});