import Ember from 'ember';
import constants from 'tripmind/appconfig/constants';

export default Ember.Component.extend({
	classNames: ['major-sections-holder'],
	classNameBindings: [],
	model: null,
	filteredItems: Ember.computed.alias('model'),
	orderedMajorSections: null,
	majorSectionType: "geo",
	minorSectionType: "geo",

	modelDidChange: function(){
		Ember.run.scheduleOnce('sync', this, 'updateSections');
	}.observes('filteredItems.[]').on('init'),

	updateSections: function(){
		var items = this.get('filteredItems');
		if (!items || items.get('length') == 0 ) {
			this.set('majorSections', []);
			return;
		}
		var majorSections = this._sectionItems(items,this.get('majorSectionType'), {countriesOnly: true, threshold: 1, minDepth: 1});
		this._subsectionSections(majorSections, this.get('minorSectionType'), {threshold: 3, minDepth: 2});
		this.set('majorSections', majorSections);
	},

	// we will have to sort items, places, or types of attraction(museums) so this will be a useful tool in many levels
	// SortItemsByGeo(items - can also be places, TH - num of items to collect for parent to appear, root level/ node)


	_sortItems: function(items, order){

	},

	//options: threshold and countriesOnly
	_sectionItems: function(items, sectionType, options) {
		var sectionsObject = {};
		var orderedSections = Ember.ArrayProxy.create({content: []});
		var extraItems = Ember.ArrayProxy.create({content: []});
		// Each type of sort returns a sectionsObject and a sortedKeys

		//----- Sort by name
		if (sectionType == 'name') {
			// Organize items into sections
			items.forEach(function(item){
				var firstLetter = item.get('name').slice(0,1).toLowerCase();
				sectionsObject[firstLetter] = sectionsObject[firstLetter] || Ember.Object.create({
					title: firstLetter,
					items: Ember.ArrayProxy.create({content: []}),
					innerSort: 'name'
				});
				sectionsObject[firstLetter].items.pushObject(item);
			});
			var orderedKeys = Object.keys(sectionsObject).sort();
		} else if (sectionType == 'geo') {


			//--- Sort by geo
			// Step 1 - build a tree that shows every descendant
			var treeObject = {};
			items.forEach(function(item){
				var ancestry = item.get('ancestry'),
					itemId = item.get('id');
				if (!ancestry || ancestry.length == (options.minDepth - 1 || 0)){
					treeObject[itemId] = treeObject[itemId] || {
						ancestryArray: [],
						count: 0,
						descs:[],
						depth: 1,
						name: item.get('name')
					}
				} else {
					var ancestorsArray = ancestry.split("/"),
						ancestorNamesArray = item.get('ancestryNames').split("/");
					ancestorsArray.forEach(function(ancestorId, index){
						if (options.countriesOnly && index > 0) return;
						treeObject[ancestorId] = treeObject[ancestorId] || {
							ancestryArray: ancestorsArray.slice(0,index),
							count: 0,
							descs: [],
							depth: index + 1,
							name: ancestorNamesArray[index]
						};
						treeObject[ancestorId].descs.push(item);
						treeObject[ancestorId].count ++;
						//TODO: add a total weight to each node based on this item's weight
						// If this item is a parent we should put it in the tree even if it doesn't have desc
						if ( constants.GOOGLE_PLACE_DESTINATION_TYPES.indexOf(item.get('itemType'))> -1) {
							treeObject[itemId] = treeObject[itemId] || {
								ancestryArray: ancestorsArray,
								count: 0,
								descs: [],
								depth: ancestorsArray.length + 1,
								name: item.get('name')
							};
						}
					})
				}
			});

			// Step 2 - sort the tree nodes by their depth from deepest to shallowest
			var treeArray = [];
			for (var itemId in treeObject){
				if (treeObject.hasOwnProperty(itemId)){
					treeArray.push(itemId);
				}
			}
			// We sort the treeArray in reverse by depth
			treeArray.sort(function(a, b) {
				if (treeObject[a].depth == treeObject[b].depth) return 0;
				return treeObject[a].depth > treeObject[b].depth ? -1 : 1;
			});



			// Step 3 - traverse from deepest node, creating a section if it has enough descendants
			// Where we create a node, we remove those items from higher up in the tree, and remove that node as well.
			// If the node did not pass the threshold, BUT it sits at the minimum depth that we care about, then it becomes a section too.
			var orderedKeys = [];
			treeArray.forEach(function(itemId){
				var descCount = treeObject[itemId].count;
				if (descCount >= options.threshold || treeObject[itemId].depth == options.minDepth) {
					if (treeObject[itemId].skipIfEmpty && treeObject[itemId].descs.length == 0) return;
					// Create the sectionsObject
					sectionsObject[itemId] = sectionsObject[itemId] || Ember.Object.create({
						title: treeObject[itemId].name,
						slug: `${itemId} ${treeObject[itemId].name}`.replace(/ /g, '_'),
						items: Ember.ArrayProxy.create({content: treeObject[itemId].descs}),
						count: treeObject[itemId].count,
						innerSort: 'name',
						subsections: null
					});
					orderedKeys.push(itemId);
					// now remove these items from the node's ancestors
					treeObject[itemId].ancestryArray.forEach(function (nodeAncestorId, index) {
						// reduce the count of that node's children - and +1 for this node itself
						treeObject[nodeAncestorId].count -= (descCount + 1);
						treeObject[nodeAncestorId].skipIfEmpty = true;
						// now remove the actual descendants from that ancestor node
						treeObject[itemId].descs.forEach(function(desc){
							treeObject[nodeAncestorId].descs.removeObject(desc)
						});
						// Now remove this own node from that ancestor
						treeObject[nodeAncestorId].descs = treeObject[nodeAncestorId].descs.reject(function(desc){
							return desc.get('id') == itemId;
						});
					})

				}
			});
			// now sort the ordered keys based on the count of items in the node in reverse order
			orderedKeys.sort(function(a,b){
				if (treeObject[a].count == treeObject[b].count) return 0;
				return treeObject[a].count > treeObject[b].count ? -1 : 1;
			})
		} else if (sectionType == 'item') {
			//------ sort for item pages

			// split items by section
			var destinations = Ember.ArrayProxy.create({content: []}),
				attractions = Ember.ArrayProxy.create({content: []}),
				restaurants = Ember.ArrayProxy.create({content: []}),
				hotels = Ember.ArrayProxy.create({content: []});
			items.forEach(function(item){
				var itemType = item.get('itemType');
				if (constants.GOOGLE_PLACE_DESTINATION_TYPES.indexOf(itemType) > -1 ){
					destinations.pushObject(item);
				} else if (constants.GOOGLE_PLACE_RESTAURANT_TYPES.indexOf(itemType) > -1){
					restaurants.pushObject(item);
				} else if (constants.GOOGLE_PLACE_NIGHTLIFE_TYPES.indexOf(itemType) > -1){
					restaurants.pushObject(item);
				} else if (constants.GOOGLE_PLACE_HOTEL_TYPES.indexOf(itemType) > -1) {
					hotels.pushObject(item);
				} else {
					attractions.pushObject(item);
				}
			});
			if (destinations.get('length')>0) sectionsObject[0] = Ember.Object.create({
				title: 'Destinations',
				items: destinations,
				innerSort: 'name'
			});
			if (attractions.get('length')>0) sectionsObject[1] = Ember.Object.create({
				title: 'Attractions',
				items: attractions,
				innerSort: 'geo'
			});
			if (restaurants.get('length')>0) sectionsObject[2] = Ember.Object.create({
				title: 'Restaurants',
				items: restaurants,
				innerSort: 'geo'
			});
			if (hotels.get('length')>0) sectionsObject[3] = Ember.Object.create({
				title: 'Hotels',
				items: hotels,
				innerSort: 'geo'
			});
			var orderedKeys = [0,1,2,3];

		}

		// Order sectionsObject into an array according to the sorted keys
		orderedKeys.forEach(function(key){
			if (sectionsObject[key]) orderedSections.pushObject(sectionsObject[key]);
		});
		return orderedSections;
	},

	_subsectionSections: function(sectionsArray, subSectionType, options) {
		var self = this;
		sectionsArray.forEach(function(section){
			section.set('subsections',  self._sectionItems(section.get('items'), subSectionType, options));
		})
	},

	//We will have major sections (France-USA.../Museum-Nature.../This week-Last week.../) Then subsections.
	// sections have a left-side shortcut menu
	// sub sections can be minimized then appear as a stack of cards
	// both section and subsection heads can be items which would make them clickable
	// both section and subsection heads can be used as a select all trigger
	// both sections and subsedtions can be sorted according to whatever we like -
	// - but this is controlled from the major section holder here
	// The major section holder has a menu where you can determine the filtering and sort for both sections and subsections

	// major section: Title Item, items in order


	actions: {
		sortDidChange: function (newSortType) {
		},
		scrollToSection: function(destination){
			var newOffset = $(`#major-section-${destination}`).offset().top;
			$('body').animate({scrollTop: newOffset}, 200);
		}
	}
});