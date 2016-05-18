import Ember from 'ember';
import Constants from 'tripmind/appconfig/constants';

export default Ember.Component.extend({
	recsService: Ember.inject.service('recs-service'),
	classNames: ['major-sections-holder'],
	classNameBindings: [],
	model: null,
	filteredItems: null,
	orderedMajorSections: null,
	majorSectionType:null,
	minorSectionType: null,

	withScrollMenu: function(){
		return !this.get('isTrash') && (this.get('withRecs') || this.get('majorSections'));
	}.property('withRecs','majorSections','isTrash'),

	withOptionsMenu: Ember.computed.or('canHaveRecs','majorSections'),

	canHaveRecs: function(){
		return this.get('model.length') || this.get('parentItem.canHaveChildren') || Constants.GOOGLE_PLACE_DESTINATION_TYPES.indexOf(this.get('parentItem.itemType')) > -1;
	}.property('parentItem.canHaveChildren','parentItem.itemType','model.length'),

	withRecs: Ember.computed.alias('recsService.withRecs'),

	showRecs: Ember.computed.and('withRecs','canHaveRecs'),

	recsSection:function(){
		return Ember.Object.create({
			title: 'Recommendations',
			items: this.get('recs'),
			sortedItems: this.get('recs'),
			scrollSlug: 'recs'
		});
	}.property('recs'),

	filterItems: function(items, attribute){
		if (!attribute) return this.get('model');
		var [filterAttribute, not] = attribute.split("-");
		var filteringItemTypes = [];
		this.get('filterOptions').filter(function(type){
			return type.isSelected
		}).forEach(function(typeOption){
			filteringItemTypes = filteringItemTypes.concat(typeOption.value);
		});
		not = (not == 'not');
		return  items.filter(function(item){
			return not ? !item.get(filterAttribute) : item.get(filterAttribute);
		}).filter(function(item){
			return filteringItemTypes.indexOf(item.get('itemType')) > -1
		})
	},

	shouldRefilterItems: function(){
		Ember.run.scheduleOnce('sync', this, 'refilterItems');
	}.observes('model.@each.trackingStatus').on('init'),

	refilterItems: function(){
		var initialItems = this.get('model'),
			prefilterAttribute = this.get('prefilterAttribute');
		this.set('filteredItems', this.filterItems(initialItems, prefilterAttribute));
	},


	majorSort: function(){
		return this.get('majorSortOptions').findBy('isSelected');
	}.property('majorSortOptions.[]'),

	subSort: function(){
		return this.get('subSortOptions').findBy('isSelected');
	}.property('subSortOptions.[]'),

	init: function () {
		this._super();
		var majorSortOptions = [
				{name: "Geography (auto-sort)", value: 'geo-auto', isSelected: true},
				{name: "Geography (A-Z)", value: 'geo-name', isSelected: false},
				{name: "Category", value: 'category', isSelected: false},
				{name: "Date visited", value: 'date', isSelected: false},
				{name: "Name", value: 'name', isSelected: false}
			],
			subSortOptions = [
				{name: "Geography (auto-sort)", value: 'geo-auto', isSelected: true},
				{name: "Geography (A-Z)", value: 'geo-name', isSelected: false},
				{name: "Category", value: 'category', isSelected: false},
				{name: "Date visited", value: 'date', isSelected: false, sortOnly: true},
				{name: "Name", value: 'name', isSelected: false, sortOnly: true}
			];
		var filterOptions = [],
			filterOptionsHash = {},
			filterOptionsOrder = ["Art",
				"Entertainment",
				"Family",
				"History",
				"Landmark",
				"Lifestyle",
				"Museum",
				"Nature",
				"Religious",
				"Other",
				"Restaurants",
				"Nightlife",
				"Shopping",
				"Hotels"
			],
			filterOptionsWithSeparator = ["Restaurants", "Nightlife", "Shopping", "Hotels"];

		Constants.GOOGLE_TYPE_FILTER_CATEGORIES.forEach(function (type) {
			filterOptionsHash[type.filterOption] = (filterOptionsHash[type.filterOption] || []).concat(type.type);
		});
		filterOptionsHash['Other'] = 	filterOptionsHash['Other'].concat(filterOptionsHash['Destination']);
		filterOptionsOrder.forEach(function (name) {
			filterOptions.push({
				name: name,
				value: filterOptionsHash[name],
				hasLineBefore: filterOptionsWithSeparator.indexOf(name) > -1,
				isSelected: true
			})
		});

		/*
		 filterOptions = [
				{name: "Museums", value: ['museum'], isSelected: true},
				{name: "Nature", value: 'nature', isSelected: true},
				{name: "Art", value: 'art', isSelected: true},
				{name: "History", value: 'history', isSelected: true},
				{name: "Other", value: ['history2'], isSelected: true},
				{name: "Restaurants", value: 'restaurant', isSelected: true, hasLineBefore: true},
				{name: "Hotels", value: 'lodging', isSelected: true, hasLineBefore: true}
			];*/

		majorSortOptions = Ember.ArrayProxy.create({content: majorSortOptions.map(function(el){
			return Ember.Object.create(el);
		})});
		subSortOptions = Ember.ArrayProxy.create({content: subSortOptions.map(function(el){
			return Ember.Object.create(el);
		})});
		filterOptions = Ember.ArrayProxy.create({content: filterOptions.map(function(el){
			return Ember.Object.create(el);
		})});
		this.setProperties({
			majorSortOptions: majorSortOptions,
			subSortOptions: subSortOptions,
			filterOptions: filterOptions
		});
	},


	modelDidChange: function(){
		Ember.run.scheduleOnce('sync', this, 'updateSections');
	}.observes('filteredItems.[]').on('init'),

	updateSections: function(){
		var items = this.get('filteredItems');
		if (!items || items.get('length') == 0 ) {
			this.set('majorSections', []);
			return;
		}
		var majorSections = this._sectionItems(items,this.get('majorSectionType') || this.get('majorSort.value'), {countriesOnly: true, threshold: 1, minDepth: 1});
		this._subsectionSections(majorSections, this.get('subSort.value'), {threshold: 3, minDepth: 2, sortOnly: this.get('subSort.sortOnly')});
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
				var firstLetter = item.get('name').slice(0,1).toUpperCase();
				sectionsObject[firstLetter] = sectionsObject[firstLetter] || Ember.Object.create({
					title: firstLetter,
					scrollSlug: firstLetter,
					items: Ember.ArrayProxy.create({content: []}),
					innerSort: 'name'
				});
				sectionsObject[firstLetter].items.pushObject(item);
			});
			var orderedKeys = Object.keys(sectionsObject).sort();
		} else if (sectionType.slice(0,3) == 'geo') {


			//--- Sort by geo
			// Step 1 - build a tree that shows every descendant
			var treeObject = {};
			items.forEach(function(item){
				var ancestry = item.get('ancestry'),
					ancestryArray = ancestry ? ancestry.split("/") : null,
					itemId = item.get('id');
				if (!ancestryArray || (ancestryArray.length == (options.minDepth - 1 || 0) && Constants.GOOGLE_PLACE_DESTINATION_TYPES.indexOf(item.get('itemType')) > -1)){
					treeObject[itemId] = treeObject[itemId] || {
						ancestryArray: [],
						count: 0,
						descs:[],
						depth: (ancestryArray ? ancestryArray.length : 0) + 1,
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
						if ( Constants.GOOGLE_PLACE_DESTINATION_TYPES.indexOf(item.get('itemType'))> -1) {
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
				if (descCount >= options.threshold || treeObject[itemId].depth <= options.minDepth) {
					if (treeObject[itemId].skipIfEmpty && treeObject[itemId].descs.length == 0) return;
					// Create the sectionsObject
					sectionsObject[itemId] = sectionsObject[itemId] || Ember.Object.create({
						title: treeObject[itemId].name,
						slug: `${itemId} ${treeObject[itemId].name}`.replace(/ /g, '+'),
						scrollSlug: `${itemId} ${treeObject[itemId].name}`.replace(/ /g, '_'),
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
			// now sort the ordered keys based on the count of items in the node in reverse order, or in A-Z order:
			if (sectionType == 'geo-auto') {

				orderedKeys.sort(function (a, b) {
					if (treeObject[a].count == treeObject[b].count) return 0;
					return treeObject[a].count > treeObject[b].count ? -1 : 1;
				})

			} else {
				orderedKeys.sort(function (a, b) {
					if (treeObject[a].name == treeObject[b].name) return 0;
					return treeObject[a].name > treeObject[b].name ? 1 : -1;
				})			}


		} else if (sectionType == 'item') {
			//------ sort for item pages

			// split items by section
			var destinations = Ember.ArrayProxy.create({content: []}),
				attractions = Ember.ArrayProxy.create({content: []}),
				restaurants = Ember.ArrayProxy.create({content: []}),
				hotels = Ember.ArrayProxy.create({content: []});
			items.forEach(function(item){
				var itemType = item.get('itemType');
				if (Constants.GOOGLE_PLACE_DESTINATION_TYPES.indexOf(itemType) > -1 ){
					destinations.pushObject(item);
				} else if (Constants.GOOGLE_PLACE_RESTAURANT_TYPES.indexOf(itemType) > -1){
					restaurants.pushObject(item);
				} else if (Constants.GOOGLE_PLACE_NIGHTLIFE_TYPES.indexOf(itemType) > -1){
					restaurants.pushObject(item);
				} else if (Constants.GOOGLE_PLACE_HOTEL_TYPES.indexOf(itemType) > -1) {
					hotels.pushObject(item);
				} else {
					attractions.pushObject(item);
				}
			});
			if (destinations.get('length')>0) sectionsObject[0] = Ember.Object.create({
				title: 'Destinations',
				scrollSlug: 'destinations',
				items: destinations,
				innerSort: 'name'
			});
			if (attractions.get('length')>0) sectionsObject[1] = Ember.Object.create({
				title: 'Attractions',
				scrollSlug: 'attractions',
				items: attractions,
				innerSort: 'geo'
			});
			if (restaurants.get('length')>0) sectionsObject[2] = Ember.Object.create({
				title: 'Restaurants',
				scrollSlug: 'restaurants',
				items: restaurants,
				innerSort: 'geo'
			});
			if (hotels.get('length')>0) sectionsObject[3] = Ember.Object.create({
				title: 'Hotels',
				scrollSlug: 'hotels',
				items: hotels,
				innerSort: 'geo'
			});
			var orderedKeys = [0,1,2,3];

		} else if (sectionType == 'category') {



			// Organize items into sections
			items.forEach(function(item){
				var itemType = item.get('itemType').replace(/_/g," ").capitalize();
				sectionsObject[itemType] = sectionsObject[itemType] || Ember.Object.create({
					title: itemType,
					scrollSlug: item.get('itemType'),
					items: Ember.ArrayProxy.create({content: []}),
					innerSort: 'name'
				});
				sectionsObject[itemType].items.pushObject(item);
			});
			var orderedKeys = Object.keys(sectionsObject).sort();
		}  else if (sectionType == 'date') {
			// Organize items into sections
			items.forEach(function(item){
				var updatedDate = item.get('updatedAtRecently');
				sectionsObject[updatedDate] = sectionsObject[updatedDate] || Ember.Object.create({
					title: updatedDate,
					value: item.get('updatedAt'),
					scrollSlug: updatedDate.replace(/[\/\s]/g,"_"),
					items: Ember.ArrayProxy.create({content: []}),
					innerSort: 'date'
				});
				sectionsObject[updatedDate].items.pushObject(item);
			});
			var orderedKeys = Object.keys(sectionsObject).sort(function (a, b) {
				return sectionsObject[a].value > sectionsObject[b].value ? -1 : 1;
			})
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
			if (options.sortOnly) {
				section.setProperties({
					subsections: null,
					sortedItems: section.get('items').sortBy(subSectionType)
				})
			} else {
				section.setProperties({
					subsections: self._sectionItems(section.get('items'), subSectionType, options),
					sortedItems: null
				});
			}
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
		updateSortOptions: function () {
			this.notifyPropertyChange('majorSortOptions');
			this.notifyPropertyChange('subSortOptions');
			Ember.run.scheduleOnce('sync', this, 'updateSections');
		},
		updateFilter: function(){
			this.notifyPropertyChange('filterOptions');
			this.shouldRefilterItems();
			Ember.run.scheduleOnce('sync', this, 'updateSections');
			console.log('refiltering!')
		},
		scrollToSection: function(destination){
			var newOffset = (destination == "top") ? 0 : $(`#major-section-${destination}`).offset().top;
			$('body').animate({scrollTop: newOffset}, 200);
		},
		toggleRecs: function(){
			this.toggleProperty('withRecs');
		}
	}
});