import Ember from 'ember';
import ItemCard from 'tripmind/components/item-card';
import Draggable from 'tripmind/mixins/draggable';


export default ItemCard.extend(Draggable, {
	drag_zIndex: 10000,
	drag_revert: true,
	drag_revertDuration: 100
});