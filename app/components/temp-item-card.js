import Ember from 'ember';
import ItemCard from 'tripmind/components/item-card';

export default ItemCard.reopen({
	classNames: ['temporary'],
	persistRecord: false,
	store: Ember.inject.service('store'),


	willDestroyElement: function(){
		if (this.get('persistRecord')){
			this.get('model').set('isTemporary', false);
			this.get('model').getAdditionalItemInfo();
		} else if (this.get('model.isTemporary')){
			this.get('model').destroyRecord();
		}
		this._super();
	},

	actions: {
		persistItem: function () {
			this.set('persistRecord', true);
		}
	}


});