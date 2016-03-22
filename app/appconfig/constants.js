import Ember from 'ember';


var Constants = Ember.Object.create({
	ITEM_TYPES_BY_NAME: {"COUNTRY": 3,
		"REGION": 4,
		"NEIGHBORHOOD": 90,
		"ATTRACTION": 100
	},
	PER_PAGE: 15,
	CDN_PATH_1: 'https://da37ts4zp7h49.cloudfront.net/photos/',
	CDN_PATH_2: 'https://d6fva57a21sq7.cloudfront.net/photos/',
	MAX_PAGE_TITLE_LENGTH: 55,
	MAX_ITEM_WITH_TYPE_IN_PARENT_LENGTH: 41,
	PAGE_TITLE_MAPPINGS: [
		"Don't miss these top %s | Wanderant",
		"Our favorite %s | Wanderant guides",
		"Our favorite %s | Wanderant",
		"Top 10 %s | Wanderant",
		"Top %s | Wanderant",
		"%s | Wanderant",
	],
	WANDERANT_IMAGES: 0,
	GOOGLE_IMAGES: 1,
	FLICKR_IMAGES: 2,
	PANORAMIO_IMAGES: 3,
	WIKIPEDIA_IMAGES: 5,
	ARBITRARY_IMAGES: 7,
	IMAGE_PROVIDERS: [
		{
			provider_id: 0,
			provider_name: "Wanderant",
			sizes: [
				{ name: "small", token: "small", max_width: 200 },
				{ name: "medium", token: "medium", max_width: 400 },
				{ name: "large", token: "large", max_width: 1200 }
			]
		},
		{
			provider_id: 1,
			provider_name: "Google",
			sizes: [
				{ name: "small", token: "w100", max_width: 100 },
				{ name: "medium", token: "w500", max_width: 500 },
				{ name: "large", token: "w3000", max_width: 3000 }
			]
		},
		{
			provider_id: 2,
			provider_name: "Flickr",
			sizes: [
				{ name: "small", token: "m", max_width: 240 },
				{ name: "medium", token: "z", max_width: 640 },
				{ name: "large", token: "b", max_width: 1024 }
			]
		},
		{
			provider_id: 3,
			provider_name: "Panoramio",
			sizes: [
				{ name: "small", token: "small", max_width: 240 },
				{ name: "medium", token: "medium", max_width: 640 },
				{ name: "large", token: "original", max_width: 1024 }
			]
		},
		{
			provider_id: 4,
			provider_name: "Google_street_view",
			sizes: [
				{ name: "small", token: "200x125", max_width: 240 },
				{ name: "medium", token: "320x200", max_width: 640 },
				{ name: "large", token: "640x400", max_width: 1024 }
			]
		},
		{
			provider_id: 5,
			provider_name: "Wikipedia",
			sizes: [
				{ name: "small", token: "150", max_width: 150 },
				{ name: "medium", token: "500", max_width: 500 },
				{ name: "large", token: "1024", max_width: 1024 }
			]
		},
		{
			provider_id: 6,
			provider_name: "Twobits",
			sizes: [
				{ name: "small", token: "200x125", max_width: 240 },
				{ name: "medium", token: "320x200", max_width: 640 },
				{ name: "large", token: "1000x1000", max_width: 1024 }
			]
		},
		{
			provider_id: 7,
			provider_name: "Arbitrary",
			sizes: [
				{ name: "small", token: "a", max_width: 240 },
				{ name: "medium", token: "a", max_width: 640 },
				{ name: "large", token: "a", max_width: 1024 }
			]
		},
	],
	ITEM_TYPES_ARRAY: [],
	GOOGLE_PLACES_TYPE_CONVERSION: {
		administrative_area_level_1: 'region',
		administrative_area_level_2: 'region',
		administrative_area_level_3: 'region',
		administrative_area_level_4: 'region',
		administrative_area_level_5: 'region',
		locality: 'city',
		colloquial_area: 'region',
		sublocality_level_4: 'sublocality',
		sublocality_level_5: 'sublocality',
		sublocality_level_3: 'sublocality',
		sublocality_level_2: 'sublocality',
		sublocality_level_1: 'sublocality',
		establishment: 'attraction'
	}




	/*baseTimeUnit: <%= BASE_TIME_UNIT %>,
	baseTimeUnitsPerDay: <%= BASE_TIME_UNITS_PER_DAY %>,

	baseHeight: <%= BASE_HEIGHT_PX %>,
	baseWidth: <%= DAY_CALENDAR_WIDTH + 2 * DAY_CALENDAR_MARGIN %>,
	EARTH_RADIUS_KM: <%= EARTH_RADIUS_KM %>,
	DEG_TO_RAD: <%= DEG_TO_RAD %>,
	AVG_SPEED_KPH: <%= AVG_SPEED_KPH %>,
	PER_PAGE: <%= PER_PAGE %>,
	DEFAULT_PAGE_TITLE: "<%= DEFAULT_PAGE_TITLE %>",
	MAX_PAGE_TITLE_LENGTH: <%= MAX_PAGE_TITLE_LENGTH %>,
	MAX_ITEM_WITH_TYPE_IN_PARENT_LENGTH: <%= MAX_ITEM_WITH_TYPE_IN_PARENT_LENGTH %>,
	ITEM_PAGE_TITLE_MAPPINGS: <%= ITEM_PAGE_TITLE_MAPPINGS.to_json %>,
	ITEM_META_DESCRIPTIONS: <%= ITEM_META_DESCRIPTIONS.to_json.gsub('%s', '%@') %>,
	TRIP_META_DESCRIPTION: <%= TRIP_META_DESCRIPTION.to_json.gsub('%s', '%@') %>,
	TimeUnitEnum: {
		SECOND: <%= SECOND %>,
		MINUTE: <%= MINUTE %>,
		TEN_MINUTES: <%= TEN_MINUTES %>,
		FIFTEEN_MINUTES: <%= FIFTEEN_MINUTES %>,
		TWENTY_MINUTES: <%= TWENTY_MINUTES %>,
		THIRTY_MINUTES: <%= THIRTY_MINUTES %>,
		HOUR: <%= HOUR %>,
		DAY: <%= DAY %>
	},
	DAY_NAMES: <%= DAY_NAMES %>,
	UserRoleEnum: {
		OWNER: <%= TRIP_OWNER %>,
		EDITOR: <%= TRIP_EDIT %>,
		COMMENTER: <%= TRIP_COMMENT %>,
		VIEWER: <%= TRIP_VIEW %>
	},
	ATTRACTION_BLOCK: <%= ATTRACTION_BLOCK %>,
	PARENT_BLOCK: <%= PARENT_BLOCK %>,
	TRAVEL_TYPES: <%= TRAVEL_TYPES.to_json %>,
	TRAVEL_TYPE_NAMES: <%= TRAVEL_TYPE_NAMES %>,
	MIN_LATLNG_BOUND: <%= MIN_LATLNG_BOUND %>,
	INTERESTING_SECTIONS: <%= INTERESTING_SECTIONS %>,
	UNINTERESTING_SECTIONS: <%= UNINTERESTING_SECTIONS %>,
	GOOGLE_PLACES_TYPE_CONVERSION: <%= GOOGLE_PLACES_TYPE_CONVERSION.to_json %>,
	GOOGLE_DESTINATIONS_ITEM_TYPES: [
		{googleType: "establishment", WaType: <%= ITEM_TYPES["ATTRACTION"] %>},
		{googleType: "locality", WaType: <%= ITEM_TYPES["CITY"] %>},
		{googleType: "sublocality", WaType: <%= ITEM_TYPES["CITY"] %>},
		{googleType: "country", WaType: <%= ITEM_TYPES["COUNTRY"] %>},
		{googleType: "administrative_area_level_1", WaType: <%= ITEM_TYPES["REGION"] %>},
		{googleType: "administrative_area_level_2", WaType: <%= ITEM_TYPES["REGION"] %>},
		{googleType: "administrative_area_level_3", WaType: <%= ITEM_TYPES["REGION"] %>}
	],
	GoogleAttractionTypeArray: ["amusement_park", "aquarium", "amusement_park", "casino", "cemetery", "church", "city_hall", "hindu_temple", "library", "mosque", "movie_theater", "museum", "park", "place_of_worship", "shopping_mall", "spa", "stadium", "synagogue", "zoo"],
	flickrLicenses: {
		0: "All Rights Reserved",
		1: "Attribution-NonCommercial-ShareAlike",
		2: "Attribution-NonCommercial",
		3: "Attribution-NonCommercial-NoDerivs",
		4: "Attribution",
		5: "Attribution-ShareAlike",
		6: "Attribution-NoDerivs",
		7: "No known copyright restrictions",
		8: "United States Government Work"
	},
	FLICKR_CC_LICENSES_IDS: "<%= FLICKR_CC_LICENCES_IDS %>",
	FLICKR_CC_NC_LICENSES_IDS: "<%= FLICKR_CC_NC_LICENCES_IDS %>",
	CDN_PATH_1: "<%= CDN_PATH_1 %>",
	CDN_PATH_2: "<%= CDN_PATH_2 %>",
	CDN_PATH_VIDEOS: "<%= CDN_PATH_1.gsub('photos/','videos/back/') %>",
	BACKGROUND_VIDEO_COUNT: 30,
	IMAGE_PROVIDERS: <%= IMAGE_PROVIDERS.to_json %>,
	WANDERANT_IMAGES: <%= WANDERANT_IMAGES %>,
	GOOGLE_IMAGES: <%= GOOGLE_IMAGES %>,
	FLICKR_IMAGES: <%= FLICKR_IMAGES %>,
	PANORAMIO_IMAGES: <%= PANORAMIO_IMAGES %>,
	WIKIPEDIA_IMAGES: <%= WIKIPEDIA_IMAGES %>,
	ARBITRARY_IMAGES: <%= ARBITRARY_IMAGES %>,
	WanderantBaseUrl: "https://www.wanderant.com",

	DUPLICATES_STEP: <%= DUPLICATES_STEP %>,
	ITEM_TYPES_BY_NAME: {},
	ITEM_TYPES_ARRAY: <%= ITEM_TYPES_ARRAY.to_json %>,
	PROMINENCE_BASE: <%= PROMINENCE_BASE %>,
	ANCESTRY_TREE_MAX_DEPTH: <%= ANCESTRY_TREE_MAX_DEPTH %>,
	SURVEY_OPTIONS: ["purpose", "addl_info", "improve"],
	SECTION_ORDER: ["Famous for", "Main destinations", "If you're into...", "Top attractions", "Suggested itineraries", "Good for a day trip"],
	REVIEW_SOURCE_NAMES: <%= REVIEW_SOURCE_NAMES %>*/
});


Constants.ITEM_TYPES_ARRAY[1] = {name: 'continent', duration: 1209600};
Constants.ITEM_TYPES_ARRAY[2] = {name: 'world region', duration: 1209600};
Constants.ITEM_TYPES_ARRAY[3] = {name: 'country', duration: 604800};
Constants.ITEM_TYPES_ARRAY[4] = {name: 'region', duration: 259200};
Constants.ITEM_TYPES_ARRAY[5] = {name: 'state', duration: 432000};
Constants.ITEM_TYPES_ARRAY[6] = {name: 'province', duration: 172800};
Constants.ITEM_TYPES_ARRAY[7] = {name: 'department', duration: 172800};
Constants.ITEM_TYPES_ARRAY[8] = {name: 'area', duration: 86400};
Constants.ITEM_TYPES_ARRAY[9] = {name: 'archipelago', duration: 86400};
Constants.ITEM_TYPES_ARRAY[10] = {name: 'islands', duration: 86400};
Constants.ITEM_TYPES_ARRAY[11] = {name: 'island', duration: 86400};
Constants.ITEM_TYPES_ARRAY[12] = {name: 'cape', duration: 14400};
Constants.ITEM_TYPES_ARRAY[13] = {name: 'county', duration: 14400};
Constants.ITEM_TYPES_ARRAY[14] = {name: 'district', duration: 14400};
Constants.ITEM_TYPES_ARRAY[15] = {name: 'peninsula', duration: 14400};
Constants.ITEM_TYPES_ARRAY[16] = {name: 'valley', duration: 14400};


Constants.ITEM_TYPES_ARRAY[30] = {name: 'city', duration: 172800};
Constants.ITEM_TYPES_ARRAY[31] = {name: 'capital city', duration: 172800};
Constants.ITEM_TYPES_ARRAY[32] = {name: 'municipality', duration: 172800};




Constants.ITEM_TYPES_ARRAY[40] = {name: 'town', duration: 14400};
Constants.ITEM_TYPES_ARRAY[41] = {name: 'township', duration: 14400};


Constants.ITEM_TYPES_ARRAY[50] = {name: 'village', duration: 14400};
Constants.ITEM_TYPES_ARRAY[51] = {name: 'resort', duration: 14400};
Constants.ITEM_TYPES_ARRAY[52] = {name: 'beach resort', duration: 14400};
Constants.ITEM_TYPES_ARRAY[53] = {name: 'ski resort', duration: 14400};


Constants.ITEM_TYPES_ARRAY[60] = {name: 'commune', duration: 7200};
Constants.ITEM_TYPES_ARRAY[70] = {name: 'sublocality', duration: 7200};
Constants.ITEM_TYPES_ARRAY[71] = {name: 'suburb', duration: 7200};



Constants.ITEM_TYPES_ARRAY[80] = {name: 'hamlet', duration: 1800};
Constants.ITEM_TYPES_ARRAY[81] = {name: 'borough', duration: 1800};
Constants.ITEM_TYPES_ARRAY[90] = {name: 'neighborhood', duration: 7200};
Constants.ITEM_TYPES_ARRAY[91] = {name: 'red light district', duration: 7200};
Constants.ITEM_TYPES_ARRAY[92] = {name: 'street', duration: 3600};
Constants.ITEM_TYPES_ARRAY[93] = {name: 'passage', duration: 1800};


Constants.ITEM_TYPES_ARRAY[100] = {name: 'attraction', duration: 3600};
Constants.ITEM_TYPES_ARRAY[101] = {name: 'museum', duration: 5400};
Constants.ITEM_TYPES_ARRAY[102] = {name: 'art gallery', duration: 5400};
Constants.ITEM_TYPES_ARRAY[103] = {name: 'gallery', duration: 5400};
Constants.ITEM_TYPES_ARRAY[104] = {name: 'History Museum', duration: 5400};
Constants.ITEM_TYPES_ARRAY[105] = {name: 'Military Museum', duration: 5400};
Constants.ITEM_TYPES_ARRAY[106] = {name: 'Art Museum', duration: 5400};
Constants.ITEM_TYPES_ARRAY[107] = {name: 'Natural History Museum', duration: 5400};
Constants.ITEM_TYPES_ARRAY[108] = {name: 'Science Museum', duration: 5400};
Constants.ITEM_TYPES_ARRAY[109] = {name: 'Specialty Museum', duration: 5400};
Constants.ITEM_TYPES_ARRAY[201] = {name: 'landmark', duration: 1800};
Constants.ITEM_TYPES_ARRAY[202] = {name: 'monument', duration: 1800};
Constants.ITEM_TYPES_ARRAY[203] = {name: 'gate', duration: 1800};
Constants.ITEM_TYPES_ARRAY[204] = {name: 'bridge', duration: 1800};
Constants.ITEM_TYPES_ARRAY[205] = {name: 'dam', duration: 1800};
Constants.ITEM_TYPES_ARRAY[206] = {name: 'statue', duration: 1800};
Constants.ITEM_TYPES_ARRAY[207] = {name: 'memorial', duration: 1800};
Constants.ITEM_TYPES_ARRAY[208] = {name: 'fountain', duration: 1800};
Constants.ITEM_TYPES_ARRAY[209] = {name: 'sculpture', duration: 1800};
Constants.ITEM_TYPES_ARRAY[210] = {name: 'aqueduct', duration: 1800};
Constants.ITEM_TYPES_ARRAY[211] = {name: 'lighthouse', duration: 1800};
Constants.ITEM_TYPES_ARRAY[212] = {name: 'mausoleum', duration: 1800};
Constants.ITEM_TYPES_ARRAY[213] = {name: 'art work', duration: 1800};

Constants.ITEM_TYPES_ARRAY[301] = {name: 'square', duration: 1800};
Constants.ITEM_TYPES_ARRAY[302] = {name: 'archaeological site', duration: 1800};
Constants.ITEM_TYPES_ARRAY[303] = {name: 'world heritage site', duration: 1800};
Constants.ITEM_TYPES_ARRAY[304] = {name: 'historic site', duration: 3600};
Constants.ITEM_TYPES_ARRAY[305] = {name: 'reservation', duration: 3600};
Constants.ITEM_TYPES_ARRAY[306] = {name: 'pier', duration: 3600};
Constants.ITEM_TYPES_ARRAY[307] = {name: 'port', duration: 3600};
Constants.ITEM_TYPES_ARRAY[308] = {name: 'canal', duration: 3600};
Constants.ITEM_TYPES_ARRAY[309] = {name: 'concentration camp', duration: 5400};
Constants.ITEM_TYPES_ARRAY[310] = {name: 'mine', duration: 3600};
Constants.ITEM_TYPES_ARRAY[311] = {name: 'reservoir', duration: 1800};
Constants.ITEM_TYPES_ARRAY[312] = {name: 'historic building', duration: 5400};



Constants.ITEM_TYPES_ARRAY[401] = {name: 'natural feature', duration: 3600};
Constants.ITEM_TYPES_ARRAY[402] = {name: 'garden', duration: 3600};
Constants.ITEM_TYPES_ARRAY[403] = {name: 'body of water', duration: 1800};
Constants.ITEM_TYPES_ARRAY[404] = {name: 'canyon', duration: 1800};
Constants.ITEM_TYPES_ARRAY[405] = {name: 'cave', duration: 1800};
Constants.ITEM_TYPES_ARRAY[406] = {name: 'desert', duration: 3600};
Constants.ITEM_TYPES_ARRAY[407] = {name: 'forest', duration: 3600};
Constants.ITEM_TYPES_ARRAY[408] = {name: 'hill', duration: 5400};

Constants.ITEM_TYPES_ARRAY[410] = {name: 'lake', duration: 5400};
Constants.ITEM_TYPES_ARRAY[411] = {name: 'mountain', duration: 14400};
Constants.ITEM_TYPES_ARRAY[412] = {name: 'river', duration: 1800};
Constants.ITEM_TYPES_ARRAY[413] = {name: 'volcano', duration: 14400};
Constants.ITEM_TYPES_ARRAY[414] = {name: 'waterfall', duration: 3600};
Constants.ITEM_TYPES_ARRAY[415] = {name: 'waterfront', duration: 3600};
Constants.ITEM_TYPES_ARRAY[416] = {name: 'park', duration: 3600};
Constants.ITEM_TYPES_ARRAY[417] = {name: 'bird watching', duration: 5400};
Constants.ITEM_TYPES_ARRAY[418] = {name: 'outdoors', duration: 3600};
Constants.ITEM_TYPES_ARRAY[419] = {name: 'zoo', duration: 5400};
Constants.ITEM_TYPES_ARRAY[420] = {name: 'aquarium', duration: 5400};
Constants.ITEM_TYPES_ARRAY[421] = {name: 'Geologic Formation', duration: 1800};
Constants.ITEM_TYPES_ARRAY[422] = {name: 'Hot Spring', duration: 3600};
Constants.ITEM_TYPES_ARRAY[423] = {name: 'National Park', duration: 7200};
Constants.ITEM_TYPES_ARRAY[424] = {name: 'Scenic Drive', duration: 5400};
Constants.ITEM_TYPES_ARRAY[425] = {name: 'Trail', duration: 5400};
Constants.ITEM_TYPES_ARRAY[426] = {name: 'Safari', duration: 10800};
Constants.ITEM_TYPES_ARRAY[427] = {name: 'Marine park', duration: 7200};
Constants.ITEM_TYPES_ARRAY[428] = {name: 'Botanical garden', duration: 7200};
Constants.ITEM_TYPES_ARRAY[429] = {name: 'Tree', duration: 1800};
Constants.ITEM_TYPES_ARRAY[430] = {name: 'summit', duration: 1800};
Constants.ITEM_TYPES_ARRAY[431] = {name: 'peak', duration: 1800};
Constants.ITEM_TYPES_ARRAY[432] = {name: 'mountain range', duration: 14400};
Constants.ITEM_TYPES_ARRAY[433] = {name: 'glacier', duration: 7200};
Constants.ITEM_TYPES_ARRAY[434] = {name: 'pinnacle', duration: 1800};
Constants.ITEM_TYPES_ARRAY[435] = {name: 'pass', duration: 5400};
Constants.ITEM_TYPES_ARRAY[436] = {name: 'pond', duration: 1800};
Constants.ITEM_TYPES_ARRAY[437] = {name: 'bay', duration: 3600};
Constants.ITEM_TYPES_ARRAY[438] = {name: 'fjord', duration: 7200};
Constants.ITEM_TYPES_ARRAY[438] = {name: 'jungle', duration: 10800};
Constants.ITEM_TYPES_ARRAY[439] = {name: 'lagoon', duration: 5400};
Constants.ITEM_TYPES_ARRAY[440] = {name: 'crater', duration: 5400};
Constants.ITEM_TYPES_ARRAY[441] = {name: 'nature reserve', duration: 7200};
Constants.ITEM_TYPES_ARRAY[442] = {name: 'swamp', duration: 5400};
Constants.ITEM_TYPES_ARRAY[443] = {name: 'wildlife reserve', duration: 7200};
Constants.ITEM_TYPES_ARRAY[444] = {name: 'stream', duration: 3600};
Constants.ITEM_TYPES_ARRAY[445] = {name: 'reef', duration: 10800};
Constants.ITEM_TYPES_ARRAY[446] = {name: 'ice field', duration: 7200};
Constants.ITEM_TYPES_ARRAY[447] = {name: 'estuary', duration: 1800};
Constants.ITEM_TYPES_ARRAY[448] = {name: 'strait', duration: 3600};
Constants.ITEM_TYPES_ARRAY[449] = {name: 'cliff', duration: 3600};



Constants.ITEM_TYPES_ARRAY[501] = {name: 'viewpoint', duration: 1800};
Constants.ITEM_TYPES_ARRAY[601] = {name: 'cultural', duration: 3600};
Constants.ITEM_TYPES_ARRAY[602] = {name: 'cultural site', duration: 1800};
Constants.ITEM_TYPES_ARRAY[603] = {name: 'educational institution', duration: 1800};



Constants.ITEM_TYPES_ARRAY[701] = {name: 'observatory', duration: 3600};
Constants.ITEM_TYPES_ARRAY[702] = {name: 'science', duration: 3600};
Constants.ITEM_TYPES_ARRAY[801] = {name: 'religious site', duration: 1800};
Constants.ITEM_TYPES_ARRAY[802] = {name: 'hindu temple', duration: 1800};
Constants.ITEM_TYPES_ARRAY[803] = {name: 'mosque', duration: 1800};
Constants.ITEM_TYPES_ARRAY[804] = {name: 'place of worship', duration: 1800};
Constants.ITEM_TYPES_ARRAY[805] = {name: 'church', duration: 1800};
Constants.ITEM_TYPES_ARRAY[806] = {name: 'synagogue', duration: 1800};
Constants.ITEM_TYPES_ARRAY[807] = {name: 'cemetery', duration: 1800};
Constants.ITEM_TYPES_ARRAY[808] = {name: 'temple', duration: 1800};
Constants.ITEM_TYPES_ARRAY[809] = {name: 'shrine', duration: 1800};
Constants.ITEM_TYPES_ARRAY[810] = {name: 'pagoda', duration: 1800};
Constants.ITEM_TYPES_ARRAY[811] = {name: 'basilica', duration: 1800};
Constants.ITEM_TYPES_ARRAY[812] = {name: 'chapel', duration: 1800};
Constants.ITEM_TYPES_ARRAY[813] = {name: 'abbey', duration: 1800};
Constants.ITEM_TYPES_ARRAY[814] = {name: 'monastery', duration: 3600};
Constants.ITEM_TYPES_ARRAY[815] = {name: 'baptistery', duration: 1800};
Constants.ITEM_TYPES_ARRAY[816] = {name: 'cloisters', duration: 1800};



Constants.ITEM_TYPES_ARRAY[901] = {name: 'activity', duration: 5400};
Constants.ITEM_TYPES_ARRAY[902] = {name: 'tour', duration: 7200};
Constants.ITEM_TYPES_ARRAY[903] = {name: 'classes', duration: 5400};
Constants.ITEM_TYPES_ARRAY[904] = {name: 'hiking', duration: 10800};
Constants.ITEM_TYPES_ARRAY[905] = {name: 'adventure', duration: 10800};
Constants.ITEM_TYPES_ARRAY[906] = {name: 'boat tour', duration: 10800};
Constants.ITEM_TYPES_ARRAY[907] = {name: 'golf', duration: 10800};
Constants.ITEM_TYPES_ARRAY[908] = {name: 'private tour', duration: 10800};
Constants.ITEM_TYPES_ARRAY[909] = {name: 'diving', duration: 21600};
Constants.ITEM_TYPES_ARRAY[910] = {name: 'sightseeing tour', duration: 5400};
Constants.ITEM_TYPES_ARRAY[911] = {name: 'swimming', duration: 5400};
Constants.ITEM_TYPES_ARRAY[912] = {name: 'walking tour', duration: 5400};
Constants.ITEM_TYPES_ARRAY[913] = {name: 'Marina', duration: 7200};
Constants.ITEM_TYPES_ARRAY[914] = {name: 'Scenic/ Historic Walking Area', duration: 5400};
Constants.ITEM_TYPES_ARRAY[915] = {name: 'Surf Camp', duration: 7200};
Constants.ITEM_TYPES_ARRAY[916] = {name: 'climbing', duration: 5400};
Constants.ITEM_TYPES_ARRAY[917] = {name: 'water sports', duration: 5400};
Constants.ITEM_TYPES_ARRAY[918] = {name: 'cycling', duration: 5400};
Constants.ITEM_TYPES_ARRAY[919] = {name: 'extreme sports', duration: 5400};
Constants.ITEM_TYPES_ARRAY[920] = {name: 'fishing', duration: 5400};
Constants.ITEM_TYPES_ARRAY[921] = {name: 'animal rides', duration: 5400};
Constants.ITEM_TYPES_ARRAY[922] = {name: 'scenic flight', duration: 5400};
Constants.ITEM_TYPES_ARRAY[923] = {name: 'driving', duration: 5400};
Constants.ITEM_TYPES_ARRAY[924] = {name: 'sports activity', duration: 5400};



Constants.ITEM_TYPES_ARRAY[1001] = {name: 'building', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1002] = {name: 'cultural building', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1003] = {name: 'government building', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1004] = {name: 'mansion', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1005] = {name: 'tower', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1006] = {name: 'windmill', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1007] = {name: 'architecture', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1008] = {name: 'castle', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1009] = {name: 'fortress', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1010] = {name: 'library', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1011] = {name: 'palace', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1012] = {name: 'villa', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1013] = {name: 'fortification', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1014] = {name: 'fort', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1015] = {name: 'edifice', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1016] = {name: 'official residence', duration: 5400};
Constants.ITEM_TYPES_ARRAY[1017] = {name: 'royal residence', duration: 5400};
Constants.ITEM_TYPES_ARRAY[1018] = {name: 'prison', duration: 5400};
Constants.ITEM_TYPES_ARRAY[1019] = {name: 'apartment', duration: 3600};



Constants.ITEM_TYPES_ARRAY[1101] = {name: 'store', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1102] = {name: 'shopping mall', duration: 5400};
Constants.ITEM_TYPES_ARRAY[1103] = {name: 'bicycle store', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1104] = {name: 'book store', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1105] = {name: 'clothing store', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1106] = {name: 'convenience store', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1107] = {name: 'department store', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1108] = {name: 'electronics store', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1109] = {name: 'florist', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1110] = {name: 'furniture store', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1111] = {name: 'grocery', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1112] = {name: 'hardware store', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1113] = {name: 'home goods store', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1114] = {name: 'jewelry store', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1115] = {name: 'liquor store', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1116] = {name: 'market', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1117] = {name: 'pet store', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1118] = {name: 'shoe store', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1119] = {name: 'Gear Rental', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1120] = {name: 'Shop', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1121] = {name: 'Specialty Shop', duration: 1800};

Constants.ITEM_TYPES_ARRAY[1201] = {name: 'bakery', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1202] = {name: 'cafe', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1203] = {name: 'food', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1204] = {name: 'meal delivery', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1205] = {name: 'meal takeaway', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1206] = {name: 'restaurant', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1207] = {name: 'Coffee house', duration: 1800};

Constants.ITEM_TYPES_ARRAY[1301] = {name: 'event', duration: 3600};

Constants.ITEM_TYPES_ARRAY[1401] = {name: 'nightlife', duration: 7200};
Constants.ITEM_TYPES_ARRAY[1402] = {name: 'night club', duration: 7200};
Constants.ITEM_TYPES_ARRAY[1403] = {name: 'dance club', duration: 7200};
Constants.ITEM_TYPES_ARRAY[1404] = {name: 'gay bar', duration: 5400};
Constants.ITEM_TYPES_ARRAY[1405] = {name: 'bar', duration: 5400};

Constants.ITEM_TYPES_ARRAY[1502] = {name: 'brewery', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1503] = {name: 'distillery', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1504] = {name: 'winery', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1601] = {name: 'entertainment', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1602] = {name: 'amusement park', duration: 7200};
Constants.ITEM_TYPES_ARRAY[1603] = {name: 'bowling alley', duration: 5400};
Constants.ITEM_TYPES_ARRAY[1604] = {name: 'casino', duration: 5400};
Constants.ITEM_TYPES_ARRAY[1605] = {name: 'movie theater', duration: 9000};
Constants.ITEM_TYPES_ARRAY[1606] = {name: 'performance venue', duration: 7200};
Constants.ITEM_TYPES_ARRAY[1607] = {name: 'sport venue', duration: 7200};
Constants.ITEM_TYPES_ARRAY[1608] = {name: 'stadium', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1609] = {name: 'theme park', duration: 10800};
Constants.ITEM_TYPES_ARRAY[1610] = {name: 'Race Car Track', duration: 5400};
Constants.ITEM_TYPES_ARRAY[1611] = {name: 'Theater', duration: 9000};
Constants.ITEM_TYPES_ARRAY[1612] = {name: 'Water Park', duration: 7200};
Constants.ITEM_TYPES_ARRAY[1613] = {name: 'Water sports', duration: 7200};
Constants.ITEM_TYPES_ARRAY[1614] = {name: 'Opera house', duration: 7200};
Constants.ITEM_TYPES_ARRAY[1615] = {name: 'festival', duration: 10800};
Constants.ITEM_TYPES_ARRAY[1616] = {name: 'race track', duration: 7200};
Constants.ITEM_TYPES_ARRAY[1617] = {name: 'amphitheater', duration: 5400};
Constants.ITEM_TYPES_ARRAY[1618] = {name: 'arena', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1619] = {name: 'roller coaster', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1620] = {name: 'arcade', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1621] = {name: 'ice skating', duration: 5400};


Constants.ITEM_TYPES_ARRAY[1701] = {name: 'spa', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1702] = {name: 'bath house', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1703] = {name: 'beach', duration: 5400};
Constants.ITEM_TYPES_ARRAY[1704] = {name: 'farm', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1705] = {name: 'gym', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1706] = {name: 'pool', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1801] = {name: 'accommodation', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1802] = {name: 'lodging', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1803] = {name: 'hotel', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1804] = {name: 'motel', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1901] = {name: 'health', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1902] = {name: 'dentist', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1903] = {name: 'doctor', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1904] = {name: 'hospital', duration: 3600};
Constants.ITEM_TYPES_ARRAY[1905] = {name: 'pharmacy', duration: 1800};
Constants.ITEM_TYPES_ARRAY[1906] = {name: 'physiotherapist', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2001] = {name: 'business', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2002] = {name: 'accounting', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2003] = {name: 'industrial site', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2004] = {name: 'Convention Center', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2005] = {name: 'Factory Tour', duration: 3600};
Constants.ITEM_TYPES_ARRAY[2101] = {name: 'airport', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2102] = {name: 'bus station', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2103] = {name: 'car rental', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2104] = {name: 'parking', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2105] = {name: 'subway station', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2106] = {name: 'taxi stand', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2107] = {name: 'train station', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2108] = {name: 'transit station', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2109] = {name: 'ship', duration: 5400};
Constants.ITEM_TYPES_ARRAY[2110] = {name: 'railway', duration: 5400};
Constants.ITEM_TYPES_ARRAY[2111] = {name: 'submarine', duration: 5400};
Constants.ITEM_TYPES_ARRAY[2112] = {name: 'ferry', duration: 3600};

Constants.ITEM_TYPES_ARRAY[2201] = {name: 'floor', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2202] = {name: 'geocode', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2203] = {name: 'intersection', duration: 1800};

Constants.ITEM_TYPES_ARRAY[2205] = {name: 'point of interest', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2206] = {name: 'political', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2207] = {name: 'post box', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2208] = {name: 'postal code', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2209] = {name: 'postal code prefix', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2210] = {name: 'postal town', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2211] = {name: 'premise', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2212] = {name: 'room', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2213] = {name: 'route', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2214] = {name: 'street address', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2215] = {name: 'street number', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2216] = {name: 'subpremise', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2301] = {name: 'atm', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2302] = {name: 'bank', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2303] = {name: 'beauty salon', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2304] = {name: 'campground', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2305] = {name: 'car dealer', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2306] = {name: 'car repair', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2307] = {name: 'car wash', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2308] = {name: 'city hall', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2309] = {name: 'courthouse', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2310] = {name: 'electrician', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2311] = {name: 'embassy', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2312] = {name: 'finance', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2313] = {name: 'financial institution', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2314] = {name: 'fire station', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2315] = {name: 'funeral home', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2316] = {name: 'gas station', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2317] = {name: 'gear rentals', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2318] = {name: 'general contractor', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2319] = {name: 'hair care', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2320] = {name: 'insurance agency', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2321] = {name: 'laundry', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2322] = {name: 'lawyer', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2323] = {name: 'locksmith', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2324] = {name: 'movie rental', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2325] = {name: 'moving company', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2326] = {name: 'painter', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2327] = {name: 'plumber', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2328] = {name: 'police', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2329] = {name: 'post office', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2330] = {name: 'real estate agency', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2331] = {name: 'roofing contractor', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2332] = {name: 'rv park', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2333] = {name: 'school', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2334] = {name: 'storage', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2335] = {name: 'travel agency', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2336] = {name: 'university', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2337] = {name: 'veterinary care', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2338] = {name: 'Military Base', duration: 3600};
Constants.ITEM_TYPES_ARRAY[2339] = {name: 'Visitor Center', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2340] = {name: 'college', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2341] = {name: 'community center', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2342] = {name: 'radio station', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2343] = {name: 'power station', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2344] = {name: 'Military site', duration: 1800};
Constants.ITEM_TYPES_ARRAY[2345] = {name: 'travel services', duration: 1800};


export default Constants;