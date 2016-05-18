import Ember from 'ember';
import ItemCard from 'tripmind/components/item-card';
import Draggable from 'tripmind/mixins/draggable';


export default ItemCard.extend(Draggable, {
	screenDefs: Ember.inject.service('screen-defs'),
	drag_zIndex: 10000,
	drag_revert: true,
	drag_revertDuration: 100,

	init: function(){
		if ((this.get('screenDefs.screenWidth')) < 600)  this.set('stopWidget', true);
		this._super();
	}
});