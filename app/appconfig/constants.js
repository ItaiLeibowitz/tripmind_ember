import Ember from 'ember';
import ENV from 'tripmind/config/environment';


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
		"%s | Wanderant"
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
		}
	],
	FLAT_DESIGN_COLORS: [
		'#D24D57',
		'#9A12B3',
		'#22A7F0',
		'#1F3A93',
		'#1BBC9B',
		'#87D37C',
		'#2ECC71',
		'#F89406',
		'#F9BF3B',
		'#F62459'
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
	},
	allowedLocationTypes: [
		"country",
		"locality",
		"administrative_area_level_1",
		"administrative_area_level_2",
		"administrative_area_level_3",
		"administrative_area_level_4",
		"administrative_area_level_5",
		"colloquial_area",
		"sublocality"
	],
	allowedLocationTypesLimited: [
		"country",
		"locality",
		"administrative_area_level_1"
	],
	GOOGLE_PLACE_DESTINATION_TYPES: ["country",
		"locality",
		"administrative_area_level_1",
		"administrative_area_level_2",
		"administrative_area_level_3",
		"administrative_area_level_4",
		"administrative_area_level_5",
		"colloquial_area",
		"sublocality"
	],
	GOOGLE_PLACE_RESTAURANT_TYPES: [
		"restaurant",
		"cafe",
		"bakery"

	],
	GOOGLE_PLACE_NIGHTLIFE_TYPES: [
		"bar",
		"casino",
		"movie_theater",
		"night_club"
	],
	GOOGLE_PLACE_HOTEL_TYPES: [
		"lodging"
	],
	DAY_NAMES: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	GOOGLE_TYPE_FILTER_CATEGORIES: [
		{type: "art_gallery", filterOption:"Art", duration: 1800},

		{type: 'art work', filterOption: "Art",duration: 1800},
		{type: 'gallery', filterOption: "Art",duration: 5400},
		{type: 'Art Museum', filterOption: "Art",duration: 5400},

		{type: "administrative_area_level_1", filterOption:"Destination", duration: 1800},
		{type: "administrative_area_level_2", filterOption:"Destination", duration: 1800},
		{type: "administrative_area_level_3", filterOption:"Destination", duration: 1800},
		{type: "administrative_area_level_4", filterOption:"Destination", duration: 1800},
		{type: "administrative_area_level_5", filterOption:"Destination", duration: 1800},
		{type: "colloquial_area", filterOption:"Destination", duration: 1800},
		{type: "country", filterOption:"Destination", duration: 1800},
		{type: "geocode", filterOption:"Destination", duration: 1800},
		{type: "intersection", filterOption:"Destination", duration: 1800},
		{type: "locality", filterOption:"Destination", duration: 1800},
		{type: "neighborhood", filterOption:"Destination", duration: 1800},
		{type: "political", filterOption:"Destination", duration: 1800},
		{type: "post_box", filterOption:"Destination", duration: 1800},
		{type: "postal_code", filterOption:"Destination", duration: 1800},
		{type: "postal_code_prefix", filterOption:"Destination", duration: 1800},
		{type: "postal_code_suffix", filterOption:"Destination", duration: 1800},
		{type: "postal_town", filterOption:"Destination", duration: 1800},
		{type: "route", filterOption:"Destination", duration: 1800},
		{type: "street_address", filterOption:"Destination", duration: 1800},
		{type: "street_number", filterOption:"Destination", duration: 1800},
		{type: "sublocality", filterOption:"Destination", duration: 1800},
		{type: "sublocality_level_1", filterOption:"Destination", duration: 1800},
		{type: "sublocality_level_2", filterOption:"Destination", duration: 1800},
		{type: "sublocality_level_3", filterOption:"Destination", duration: 1800},
		{type: "sublocality_level_4", filterOption:"Destination", duration: 1800},
		{type: "sublocality_level_5", filterOption:"Destination", duration: 1800},

		{type: 'continent', filterOption: "Destination",duration: 1209600},
		{type: 'world region', filterOption: "Destination",duration: 1209600},
		{type: 'region', filterOption: "Destination",duration: 259200},
		{type: 'state', filterOption: "Destination",duration: 432000},
		{type: 'province', filterOption: "Destination",duration: 172800},
		{type: 'department', filterOption: "Destination",duration: 172800},
		{type: 'area', filterOption: "Destination",duration: 86400},
		{type: 'archipelago', filterOption: "Destination",duration: 86400},
		{type: 'islands', filterOption: "Destination",duration: 86400},
		{type: 'island', filterOption: "Destination",duration: 86400},
		{type: 'cape', filterOption: "Destination",duration: 14400},
		{type: 'county', filterOption: "Destination",duration: 14400},
		{type: 'district', filterOption: "Destination",duration: 14400},
		{type: 'peninsula', filterOption: "Destination",duration: 14400},
		{type: 'valley', filterOption: "Destination",duration: 14400},
		{type: 'city', filterOption: "Destination",duration: 172800},
		{type: 'capital city', filterOption: "Destination",duration: 172800},
		{type: 'municipality', filterOption: "Destination",duration: 172800},
		{type: 'town', filterOption: "Destination",duration: 14400},
		{type: 'township', filterOption: "Destination",duration: 14400},
		{type: 'village', filterOption: "Destination",duration: 14400},
		{type: 'resort', filterOption: "Destination",duration: 14400},
		{type: 'beach resort', filterOption: "Destination",duration: 14400},
		{type: 'ski resort', filterOption: "Destination",duration: 14400},
		{type: 'commune', filterOption: "Destination",duration: 7200},
		{type: 'suburb', filterOption: "Destination",duration: 7200},
		{type: 'hamlet', filterOption: "Destination",duration: 1800},
		{type: 'borough', filterOption: "Destination",duration: 1800},
		{type: 'red light district', filterOption: "Destination",duration: 7200},
		{type: 'street', filterOption: "Destination",duration: 3600},
		{type: 'passage', filterOption: "Destination",duration: 1800},



		{type: "casino", filterOption:"Entertainment", duration: 7200},
		{type: "movie_theater", filterOption:"Entertainment", duration: 9000},
		{type: "stadium", filterOption:"Entertainment", duration: 9000},
		{type: 'entertainment', filterOption: "Entertainment",duration: 3600},
		{type: 'bowling alley', filterOption: "Entertainment",duration: 5400},
		{type: 'casino', filterOption: "Entertainment",duration: 5400},
		{type: 'movie theater', filterOption: "Entertainment",duration: 9000},
		{type: 'performance venue', filterOption: "Entertainment",duration: 7200},
		{type: 'sport venue', filterOption: "Entertainment",duration: 7200},
		{type: 'stadium', filterOption: "Entertainment",duration: 1800},
		{type: 'Race Car Track', filterOption: "Entertainment",duration: 5400},
		{type: 'Theater', filterOption: "Entertainment",duration: 9000},
		{type: 'Water sports', filterOption: "Entertainment",duration: 7200},
		{type: 'Opera house', filterOption: "Entertainment",duration: 7200},
		{type: 'festival', filterOption: "Entertainment",duration: 10800},
		{type: 'race track', filterOption: "Entertainment",duration: 7200},
		{type: 'amphitheater', filterOption: "Entertainment",duration: 5400},
		{type: 'arena', filterOption: "Entertainment",duration: 3600},
		{type: 'arcade', filterOption: "Entertainment",duration: 3600},
		{type: 'ice skating', filterOption: "Entertainment",duration: 5400},

		{type: "amusement_park", filterOption:"Family", duration: 14400},
		{type: 'amusement park', filterOption: "Family",duration: 7200},
		{type: 'Water Park', filterOption: "Family",duration: 7200},
		{type: 'theme park', filterOption: "Family",duration: 10800},
		{type: 'roller coaster', filterOption: "Family",duration: 1800},


		{type: 'archaeological site', filterOption: "History",duration: 1800},
		{type: 'world heritage site', filterOption: "History",duration: 1800},
		{type: 'historic site', filterOption: "History",duration: 3600},
		{type: 'reservation', filterOption: "Nature",duration: 3600},
		{type: 'concentration camp', filterOption: "History",duration: 5400},
		{type: 'historic building', filterOption: "History",duration: 5400},




		{type: "lodging", filterOption:"Hotels", duration: 0},
		{type: 'accommodation', filterOption: "Hotels",duration: 0},
		{type: 'hotel', filterOption: "Hotels",duration: 0},
		{type: 'motel', filterOption: "Hotels",duration: 0},



		{type: "city_hall", filterOption:"Landmark", duration: 1800},
		{type: "library", filterOption:"Landmark", duration: 1800},
		{type: "local_government_office", filterOption:"Landmark", duration: 1800},

		{type: 'landmark', filterOption: "Landmark",duration: 1800},
		{type: 'monument', filterOption: "Landmark",duration: 1800},
		{type: 'gate', filterOption: "Landmark",duration: 1800},
		{type: 'bridge', filterOption: "Landmark",duration: 1800},
		{type: 'dam', filterOption: "Landmark",duration: 1800},
		{type: 'statue', filterOption: "Landmark",duration: 1800},
		{type: 'memorial', filterOption: "Landmark",duration: 1800},
		{type: 'fountain', filterOption: "Landmark",duration: 1800},
		{type: 'sculpture', filterOption: "Landmark",duration: 1800},
		{type: 'aqueduct', filterOption: "Landmark",duration: 1800},
		{type: 'lighthouse', filterOption: "Landmark",duration: 1800},
		{type: 'mausoleum', filterOption: "Landmark",duration: 1800},
		{type: 'pier', filterOption: "Landmark",duration: 3600},
		{type: 'port', filterOption: "Landmark",duration: 3600},
		{type: 'canal', filterOption: "Landmark",duration: 3600},
		{type: 'square', filterOption: "Landmark",duration: 1800},
		{type: 'viewpoint', filterOption: "Landmark",duration: 1800},


		{type: "beauty_salon", filterOption:"Lifestyle", duration: 1800},
		{type: "gym", filterOption:"Lifestyle", duration: 5400},
		{type: "spa", filterOption:"Lifestyle", duration: 1800},
		{type: 'bath house', filterOption: "Lifestyle",duration: 3600},
		{type: 'pool', filterOption: "Lifestyle",duration: 3600},

		{type: "museum", filterOption:"Museum", duration: 3600},
		{type: 'History Museum', filterOption: "Museum",duration: 5400},
		{type: 'Military Museum', filterOption: "Museum",duration: 5400},
		{type: 'Natural History Museum', filterOption: "Museum",duration: 5400},
		{type: 'Science Museum', filterOption: "Museum",duration: 5400},
		{type: 'Specialty Museum', filterOption: "Museum",duration: 5400},



		{type: "aquarium", filterOption:"Nature", duration: 3600},
		{type: "natural_feature", filterOption:"Nature", duration: 3600},
		{type: 'reservoir', filterOption: "Nature",duration: 1800},
		{type: 'natural feature', filterOption: "Nature",duration: 3600},
		{type: 'garden', filterOption: "Nature",duration: 3600},
		{type: 'body of water', filterOption: "Nature",duration: 1800},
		{type: 'canyon', filterOption: "Nature",duration: 1800},
		{type: 'cave', filterOption: "Nature",duration: 1800},
		{type: 'desert', filterOption: "Nature",duration: 3600},
		{type: 'forest', filterOption: "Nature",duration: 3600},
		{type: 'hill', filterOption: "Nature",duration: 5400},
		{type: 'lake', filterOption: "Nature",duration: 5400},
		{type: 'mountain', filterOption: "Nature",duration: 14400},
		{type: 'river', filterOption: "Nature",duration: 1800},
		{type: 'volcano', filterOption: "Nature",duration: 14400},
		{type: 'waterfall', filterOption: "Nature",duration: 3600},
		{type: 'waterfront', filterOption: "Nature",duration: 3600},
		{type: 'park', filterOption: "Nature",duration: 3600},
		{type: 'bird watching', filterOption: "Nature",duration: 5400},
		{type: 'outdoors', filterOption: "Nature",duration: 3600},
		{type: 'zoo', filterOption: "Nature",duration: 5400},
		{type: 'aquarium', filterOption: "Nature",duration: 5400},
		{type: 'Geologic Formation', filterOption: "Nature",duration: 1800},
		{type: 'Hot Spring', filterOption: "Nature",duration: 3600},
		{type: 'National Park', filterOption: "Nature",duration: 7200},
		{type: 'Scenic Drive', filterOption: "Nature",duration: 5400},
		{type: 'Trail', filterOption: "Nature",duration: 5400},
		{type: 'Safari', filterOption: "Nature",duration: 10800},
		{type: 'Marine park', filterOption: "Nature" ,duration: 7200},
		{type: 'Botanical garden', filterOption: "Nature",duration: 7200},
		{type: 'Tree', filterOption: "Nature",duration: 1800},
		{type: 'summit', filterOption: "Nature",duration: 1800},
		{type: 'peak', filterOption: "Nature",duration: 1800},
		{type: 'mountain range', filterOption: "Nature",duration: 14400},
		{type: 'glacier', filterOption: "Nature",duration: 7200},
		{type: 'pinnacle', filterOption: "Nature",duration: 1800},
		{type: 'pass', filterOption: "Nature",duration: 5400},
		{type: 'pond', filterOption: "Nature",duration: 1800},
		{type: 'bay', filterOption: "Nature",duration: 3600},
		{type: 'fjord', filterOption: "Nature",duration: 7200},
		{type: 'jungle', filterOption: "Nature",duration: 10800},
		{type: 'lagoon', filterOption: "Nature",duration: 5400},
		{type: 'crater', filterOption: "Nature",duration: 5400},
		{type: 'nature reserve', filterOption: "Nature",duration: 7200},
		{type: 'swamp', filterOption: "Nature",duration: 5400},
		{type: 'wildlife reserve', filterOption: "Nature",duration: 7200},
		{type: 'stream', filterOption: "Nature",duration: 3600},
		{type: 'reef', filterOption: "Nature",duration: 10800},
		{type: 'ice field', filterOption: "Nature",duration: 7200},
		{type: 'estuary', filterOption: "Nature",duration: 1800},
		{type: 'strait', filterOption: "Nature",duration: 3600},
		{type: 'cliff', filterOption: "Nature",duration: 3600},
		{type: 'hiking', filterOption: "Nature",duration: 10800},
		{type: 'diving', filterOption: "Nature",duration: 21600},
		{type: 'fishing', filterOption: "Nature",duration: 5400},
		{type: 'animal rides', filterOption: "Nature",duration: 5400},
		{type: 'beach', filterOption: "Nature",duration: 5400},
		{type: 'farm', filterOption: "Nature",duration: 1800},

		{type: "bar", filterOption:"Nightlife", duration: 3600},
		{type: "night_club", filterOption:"Nightlife", duration: 1800},
		{type: 'nightlife', filterOption: "Nightlife",duration: 7200},
		{type: 'night club', filterOption: "Nightlife",duration: 7200},
		{type: 'dance club', filterOption: "Nightlife",duration: 7200},
		{type: 'gay bar', filterOption: "Nightlife",duration: 5400},

		{type: "accounting", filterOption:"Other", duration: 1800},
		{type: "airport", filterOption:"Other", duration: 3600},
		{type: "atm", filterOption:"Other", duration: 1800},
		{type: "bank", filterOption:"Other", duration: 1800},
		{type: "bicycle_store", filterOption:"Other", duration: 1800},
		{type: "bowling_alley", filterOption:"Other", duration: 1800},
		{type: "bus_station", filterOption:"Other", duration: 1800},
		{type: "campground", filterOption:"Other", duration: 1800},
		{type: "car_dealer", filterOption:"Other", duration: 1800},
		{type: "car_rental", filterOption:"Other", duration: 1800},
		{type: "car_repair", filterOption:"Other", duration: 1800},
		{type: "car_wash", filterOption:"Other", duration: 1800},
		{type: "cemetery", filterOption:"Other", duration: 1800},
		{type: "courthouse", filterOption:"Other", duration: 1800},
		{type: "dentist", filterOption:"Other", duration: 1800},
		{type: "doctor", filterOption:"Other", duration: 1800},
		{type: "electrician", filterOption:"Other", duration: 1800},
		{type: "embassy", filterOption:"Other", duration: 1800},
		{type: "establishment", filterOption:"Other", duration: 1800},
		{type: "finance", filterOption:"Other", duration: 1800},
		{type: "fire_station", filterOption:"Other", duration: 1800},
		{type: "floor", filterOption:"Other", duration: 1800},
		{type: "food", filterOption:"Other", duration: 3600},
		{type: "funeral_home", filterOption:"Other", duration: 1800},
		{type: "gas_station", filterOption:"Other", duration: 1800},
		{type: "general_contractor", filterOption:"Other", duration: 1800},
		{type: "grocery_or_supermarket", filterOption:"Other", duration: 1800},
		{type: "hair_care", filterOption:"Other", duration: 1800},
		{type: "health", filterOption:"Other", duration: 1800},
		{type: "hospital", filterOption:"Other", duration: 1800},
		{type: "insurance_agency", filterOption:"Other", duration: 1800},
		{type: "laundry", filterOption:"Other", duration: 1800},
		{type: "lawyer", filterOption:"Other", duration: 1800},
		{type: "locksmith", filterOption:"Other", duration: 1800},
		{type: "meal_delivery", filterOption:"Other", duration: 1800},
		{type: "meal_takeaway", filterOption:"Other", duration: 1800},
		{type: "movie_rental", filterOption:"Other", duration: 1800},
		{type: "moving_company", filterOption:"Other", duration: 1800},
		{type: "painter", filterOption:"Other", duration: 1800},
		{type: "parking", filterOption:"Other", duration: 1800},
		{type: "pharmacy", filterOption:"Other", duration: 1800},
		{type: "physiotherapist", filterOption:"Other", duration: 1800},
		{type: "plumber", filterOption:"Other", duration: 1800},
		{type: "point_of_interest", filterOption:"Other", duration: 1800},
		{type: "police", filterOption:"Other", duration: 1800},
		{type: "post_office", filterOption:"Other", duration: 1800},
		{type: "premise", filterOption:"Other", duration: 1800},
		{type: "real_estate_agency", filterOption:"Other", duration: 1800},
		{type: "roofing_contractor", filterOption:"Other", duration: 1800},
		{type: "room", filterOption:"Other", duration: 1800},
		{type: "rv_park", filterOption:"Other", duration: 1800},
		{type: "school", filterOption:"Other", duration: 1800},
		{type: "storage", filterOption:"Other", duration: 1800},
		{type: "subpremise", filterOption:"Other", duration: 1800},
		{type: "subway_station", filterOption:"Other", duration: 1800},
		{type: "taxi_stand", filterOption:"Other", duration: 1800},
		{type: "train_station", filterOption:"Other", duration: 1800},
		{type: "transit_station", filterOption:"Other", duration: 1800},
		{type: "travel_agency", filterOption:"Other", duration: 1800},
		{type: "university", filterOption:"Other", duration: 1800},
		{type: "veterinary_care", filterOption:"Other", duration: 1800},
		{type: "attraction", filterOption:"Other", duration: 1800},
		{type: 'mine', filterOption: "Other",duration: 3600},
		{type: 'cultural', filterOption: "Other",duration: 3600},
		{type: 'cultural site', filterOption:  "Other",duration: 1800},
		{type: 'educational institution', filterOption: "Other",duration: 1800},
		{type: 'observatory', filterOption: "Other",duration: 3600},
		{type: 'science', filterOption:  "Other",duration: 3600},
		{type: 'activity', filterOption:  "Other",duration: 5400},
		{type: 'tour', filterOption:  "Other",duration: 7200},
		{type: 'classes', filterOption:  "Other",duration: 5400},
		{type: 'adventure', filterOption:  "Other",duration: 10800},
		{type: 'boat tour', filterOption:  "Other",duration: 10800},
		{type: 'golf', filterOption:  "Other",duration: 10800},
		{type: 'private tour', filterOption:  "Other",duration: 10800},
		{type: 'sightseeing tour', filterOption:  "Other",duration: 5400},
		{type: 'swimming', filterOption:  "Other",duration: 5400},
		{type: 'walking tour', filterOption:  "Other",duration: 5400},
		{type: 'Marina', filterOption:  "Other",duration: 7200},
		{type: 'Scenic/ Historic Walking Area', filterOption:  "Other",duration: 5400},
		{type: 'Surf Camp', filterOption:  "Other",duration: 7200},
		{type: 'climbing', filterOption:  "Other",duration: 5400},
		{type: 'water sports', filterOption:  "Other",duration: 5400},
		{type: 'cycling', filterOption: "Other" ,duration: 5400},
		{type: 'extreme sports', filterOption:  "Other",duration: 5400},
		{type: 'scenic flight', filterOption:  "Other",duration: 5400},
		{type: 'driving', filterOption:  "Other",duration: 5400},
		{type: 'sports activity', filterOption: "Other",duration: 5400},


		{type: 'building', filterOption: "Other",duration: 1800},
		{type: 'cultural building', filterOption: "Other",duration: 1800},
		{type: 'government building', filterOption: "Other",duration: 1800},
		{type: 'mansion', filterOption: "Other",duration: 3600},
		{type: 'tower', filterOption: "Other",duration: 1800},
		{type: 'windmill', filterOption: "Other",duration: 1800},
		{type: 'architecture', filterOption: "Other",duration: 1800},
		{type: 'castle', filterOption: "Other",duration: 3600},
		{type: 'fortress', filterOption: "Other",duration: 3600},
		{type: 'library', filterOption: "Other",duration: 1800},
		{type: 'palace', filterOption: "Other",duration: 3600},
		{type: 'villa', filterOption: "Other",duration: 3600},
		{type: 'fortification', filterOption: "Other",duration: 1800},
		{type: 'fort', filterOption: "Other",duration: 3600},
		{type: 'edifice', filterOption:"Other" ,duration: 3600},
		{type: 'official residence', filterOption: "Other",duration: 5400},
		{type: 'royal residence', filterOption: "Other",duration: 5400},
		{type: 'prison', filterOption: "Other",duration: 5400},
		{type: 'apartment', filterOption: "Other",duration: 3600},


		{type: 'health', filterOption:"Other" ,duration: 1800},
		{type: 'dentist', filterOption: "Other",duration: 3600},
		{type: 'doctor', filterOption: "Other",duration: 1800},
		{type: 'hospital', filterOption: "Other",duration: 3600},
		{type: 'pharmacy', filterOption: "Other",duration: 1800},
		{type: 'physiotherapist', filterOption: "Other",duration: 1800},
		{type: 'business', filterOption: "Other",duration: 1800},
		{type: 'accounting', filterOption: "Other",duration: 1800},
		{type: 'industrial site', filterOption: "Other",duration: 1800},
		{type: 'Convention Center', filterOption: "Other",duration: 1800},
		{type: 'Factory Tour', filterOption: "Other",duration: 3600},
		{type: 'airport', filterOption: "Other",duration: 1800},
		{type: 'bus station', filterOption: "Other",duration: 1800},
		{type: 'car rental', filterOption: "Other",duration: 1800},
		{type: 'parking', filterOption: "Other",duration: 1800},
		{type: 'subway station', filterOption: "Other",duration: 1800},
		{type: 'taxi stand', filterOption: "Other",duration: 1800},
		{type: 'train station', filterOption: "Other",duration: 1800},
		{type: 'transit station', filterOption: "Other",duration: 1800},
		{type: 'ship', filterOption: "Other",duration: 5400},
		{type: 'railway', filterOption: "Other",duration: 5400},
		{type: 'submarine', filterOption: "Other",duration: 5400},
		{type: 'ferry', filterOption:"Other" ,duration: 3600},

		{type: 'floor', filterOption: "Other",duration: 1800},
		{type: 'geocode', filterOption: "Other",duration: 1800},
		{type: 'intersection', filterOption: "Other",duration: 1800},

		{type: 'point of interest', filterOption: "Other",duration: 1800},
		{type: 'atm', filterOption: "Other",duration: 1800},
		{type: 'bank', filterOption: "Other",duration: 1800},
		{type: 'beauty salon', filterOption: "Other",duration: 1800},
		{type: 'campground', filterOption: "Other",duration: 1800},
		{type: 'car dealer', filterOption: "Other",duration: 1800},
		{type: 'car repair', filterOption: "Other",duration: 1800},
		{type: 'car wash', filterOption: "Other",duration: 1800},
		{type: 'courthouse', filterOption: "Other",duration: 1800},
		{type: 'electrician', filterOption: "Other",duration: 1800},
		{type: 'embassy', filterOption: "Other",duration: 1800},
		{type: 'finance', filterOption: "Other",duration: 1800},
		{type: 'financial institution', filterOption: "Other",duration: 1800},
		{type: 'fire station', filterOption: "Other",duration: 1800},
		{type: 'funeral home', filterOption: "Other",duration: 1800},
		{type: 'gas station', filterOption: "Other",duration: 1800},
		{type: 'gear rentals', filterOption: "Other",duration: 1800},
		{type: 'general contractor', filterOption: "Other",duration: 1800},
		{type: 'hair care', filterOption: "Other",duration: 1800},
		{type: 'insurance agency', filterOption: "Other",duration: 1800},
		{type: 'laundry', filterOption: "Other",duration: 1800},
		{type: 'lawyer', filterOption: "Other",duration: 1800},
		{type: 'locksmith', filterOption: "Other",duration: 1800},
		{type: 'movie rental', filterOption: "Other",duration: 1800},
		{type: 'moving company', filterOption: "Other",duration: 1800},
		{type: 'painter', filterOption: "Other",duration: 1800},
		{type: 'plumber', filterOption: "Other",duration: 1800},
		{type: 'police', filterOption: "Other",duration: 1800},
		{type: 'post office', filterOption: "Other",duration: 1800},
		{type: 'real estate agency', filterOption: "Other",duration: 1800},
		{type: 'roofing contractor', filterOption: "Other",duration: 1800},
		{type: 'rv park', filterOption: "Other",duration: 1800},
		{type: 'school', filterOption: "Other",duration: 1800},
		{type: 'storage', filterOption: "Other",duration: 1800},
		{type: 'travel agency', filterOption: "Other",duration: 1800},
		{type: 'university', filterOption: "Other",duration: 1800},
		{type: 'veterinary care', filterOption: "Other",duration: 1800},
		{type: 'Military Base', filterOption: "Other",duration: 3600},
		{type: 'Visitor Center', filterOption: "Other",duration: 1800},
		{type: 'college', filterOption: "Other",duration: 1800},
		{type: 'community center', filterOption: "Other",duration: 1800},
		{type: 'radio station', filterOption: "Other",duration: 1800},
		{type: 'power station', filterOption: "Other",duration: 1800},
		{type: 'Military site', filterOption: "Other",duration: 1800},
		{type: 'travel services', filterOption: "Other",duration: 1800},


		{type: 'event', filterOption: "Other",duration: 3600},


		{type: "church", filterOption:"Religious", duration: 1800},
		{type: "hindu_temple", filterOption:"Religious", duration: 1800},
		{type: "mosque", filterOption:"Religious", duration: 1800},
		{type: "place_of_worship", filterOption:"Religious", duration: 1800},
		{type: "synagogue", filterOption:"Religious", duration: 1800},
		{type: 'religious site', filterOption: "Religious",duration: 1800},
		{type: 'hindu temple', filterOption: "Religious",duration: 1800},
		{type: 'mosque', filterOption: "Religious",duration: 1800},
		{type: 'place of worship', filterOption: "Religious",duration: 1800},
		{type: 'cemetery', filterOption: "Religious",duration: 1800},
		{type: 'temple', filterOption: "Religious",duration: 1800},
		{type: 'shrine', filterOption: "Religious",duration: 1800},
		{type: 'pagoda', filterOption: "Religious",duration: 1800},
		{type: 'basilica', filterOption: "Religious",duration: 1800},
		{type: 'chapel', filterOption: "Religious",duration: 1800},
		{type: 'abbey', filterOption: "Religious",duration: 1800},
		{type: 'monastery', filterOption: "Religious",duration: 3600},
		{type: 'baptistery', filterOption:"Religious" ,duration: 1800},
		{type: 'cloisters', filterOption: "Religious",duration: 1800},




		{type: "bakery", filterOption:"Restaurants", duration: 1800},
		{type: "cafe", filterOption:"Restaurants", duration: 1800},
		{type: "restaurant", filterOption:"Restaurants", duration: 5400},
		{type: 'food', filterOption: "Restaurants",duration: 3600},
		{type: 'meal delivery', filterOption: "Restaurants",duration: 1800},
		{type: 'meal takeaway', filterOption: "Restaurants",duration: 1800},
		{type: 'Coffee house', filterOption: "Restaurants",duration: 1800},
		{type: 'brewery', filterOption: "Restaurants",duration: 3600},
		{type: 'distillery', filterOption: "Restaurants",duration: 3600},
		{type: 'winery', filterOption: "Restaurants",duration: 1800},

		{type: "book_store", filterOption:"Shopping", duration: 1800},
		{type: "clothing_store", filterOption:"Shopping", duration: 1800},
		{type: "convenience_store", filterOption:"Shopping", duration: 1800},
		{type: "department_store", filterOption:"Shopping", duration: 1800},
		{type: "electronics_store", filterOption:"Shopping", duration: 1800},
		{type: "florist", filterOption:"Shopping", duration: 1800},
		{type: "furniture_store", filterOption:"Shopping", duration: 1800},
		{type: "hardware_store", filterOption:"Shopping", duration: 1800},
		{type: "home_goods_store", filterOption:"Shopping", duration: 1800},
		{type: "jewelry_store", filterOption:"Shopping", duration: 1800},
		{type: "liquor_store", filterOption:"Shopping", duration: 1800},
		{type: "pet_store", filterOption:"Shopping", duration: 1800},
		{type: "shoe_store", filterOption:"Shopping", duration: 1800},
		{type: "shopping_mall", filterOption:"Shopping", duration: 5400},
		{type: "store", filterOption:"Shopping", duration: 1800},
		{type: 'shopping mall', filterOption: "Shopping",duration: 5400},
		{type: 'bicycle store', filterOption: "Shopping",duration: 1800},
		{type: 'book store', filterOption: "Shopping",duration: 1800},
		{type: 'clothing store', filterOption: "Shopping",duration: 1800},
		{type: 'convenience store', filterOption: "Shopping",duration: 1800},
		{type: 'department store', filterOption: "Shopping",duration: 3600},
		{type: 'electronics store', filterOption: "Shopping",duration: 1800},
		{type: 'furniture store', filterOption: "Shopping",duration: 1800},
		{type: 'hardware store', filterOption: "Shopping",duration: 1800},
		{type: 'home goods store', filterOption: "Shopping",duration: 1800},
		{type: 'jewelry store', filterOption: "Shopping",duration: 1800},
		{type: 'liquor store', filterOption: "Shopping",duration: 1800},
		{type: 'pet store', filterOption: "Shopping",duration: 1800},
		{type: 'shoe store', filterOption: "Shopping",duration: 1800},
		{type: 'Gear Rental', filterOption: "Shopping",duration: 1800},
		{type: 'Shop', filterOption: "Shopping",duration: 1800},
		{type: 'Specialty Shop', filterOption: "Shopping",duration: 1800}
	]
		






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

if (ENV.environment === 'development'){
	Constants.BASE_SERVER_URL = "";
}

if (ENV.environment === 'production' || ENV.environment === 'staging'){
	Constants.BASE_SERVER_URL = "https://www.wanderant.com";
}


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