import Ember from 'ember';
import ENV from 'tripmind/config/environment';

var places = [

];

var addlData = {data: [
	{
		id: "ChIJD3uTd9hx5kcR1IQvGfr8dbk",
		type: 'item',
		attributes: {
			ancestryNames: "France/Paris",
			ancestry: "ChIJMVd4MymgVA0R99lHx5Y__Ws/ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
			address: "75001 Paris, France",
			longDesc: "The Louvre Palace is a former royal palace located on the Right Bank of the Seine in Paris, between the Tuileries Gardens and the church of Saint-Germain l'Auxerrois. Wikipedia",
			image: "https://lh5.googleusercontent.com/-HIc3V6HYPg4/VrXryykTJ2I/AAAAAAAAmVo/adAXMHlv0Pw/w3000-k/",
			lat: "48.8606111",
			lng: "2.337644",
			name: "The Louvre",
			place_id: "ChIJD3uTd9hx5kcR1IQvGfr8dbk",
			oneliner: "Palace in Paris, France",
			itemType: "museum",
			updatedAt: "1460548462"
		},
		relationships: {
			collections: {
				data: [
					{ type: 'collection', id: "tmp1" }
				]
			}
		}
	},
	{
		id: "ChIJ442GNENu5kcRGYUrvgqHw88",
		type: 'item',
		attributes: {
			ancestryNames: "France/Paris",
			ancestry: "ChIJMVd4MymgVA0R99lHx5Y__Ws/ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
			address: "Montmartre hill, Paris, France",
			longDesc: "The Basilica of the Sacred Heart of Paris, commonly known as Sacré-Cœur Basilica and often simply Sacré-Cœur, is a Roman Catholic church and minor basilica, dedicated to the Sacred Heart of Jesus, in Paris, France. ",
			image: "https://lh5.googleusercontent.com/-Bjqfs1z6bJ0/VG8NbQBV5jI/AAAAAAAAAA8/NxjyxM37UAQ/w3000-k/",
			lat: "48.7606111",
			lng: "2.437644",
			name: "Sacre Coeur",
			place_id: "ChIJ442GNENu5kcRGYUrvgqHw88",
			oneliner: "Church in Paris, France",
			itemType: "place of worship",
			trackingStatus: false,
			updatedAt: "1465948462"
		}
	},
	{   id: "ChIJdbbQwbZx5kcRs7Qu5nPw18g",
		type: 'item',
		attributes: {
			ancestryNames: "France/Paris",
			ancestry: "ChIJMVd4MymgVA0R99lHx5Y__Ws/ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
			address: "1 Avenue du Colonel Henri Rol-Tanguy, 75014 Paris, France",
			longDesc: "The Catacombs of Paris are underground ossuaries in Paris, France which hold the remains of about six million people in a small part of the ancient Mines of Paris tunnel network. Wikipedia",
			image: "https://lh5.googleusercontent.com/-VpLjFFT9_O8/VAiPrcdVQ9I/AAAAAAAAF4E/o-FmhWyOtJ8/w3000-k/",
			lat: "48.8338325",
			lng: "2.3324222",
			name: "Catacombs of Paris",
			place_id: "ChIJdbbQwbZx5kcRs7Qu5nPw18g",
			oneliner: "Cemetery",
			itemType: "cemetery",
			updatedAt: "1460712462"
		},
		relationships: {
			collections: {
				data: [
					{ type: 'collection', id: "tmp1" }
				]
			}
		}
	},
	{
		id: "ChIJMVd4MymgVA0R99lHx5Y__Ws",
		type: 'item',
		attributes: {
			ancestryNames: "",
			ancestry: "",
			address: "France",
			longDesc: "France is the most toured country in the World with 80 million visitors annually.",
			//image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOMAAACXCAMAAADQ4xypAAAAFVBMVEX///8AI5XtKTl0e7fzfYTtESgAAJCDlMQAAAAAp0lEQVR4nO3PNwEAMAADoHT6l1wTOXqAAzJq7krPPrMmjo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Onx0fofSNkUYueUMAAAAASUVORK5CYII=",
			lat: "46.22606111",
			lng: "2.21",
			name: "France",
			place_id: "ChIJMVd4MymgVA0R99lHx5Y__Ws",
			oneliner: "Country",
			itemType: "country",
			updatedAt: "1460248462"
		}
	},
	{
		id: "ChIJCzYy5IS16lQRQrfeQ5K5Oxw",
		type: 'item',
		attributes: {
			ancestryNames: "",
			ancestry: "",
			address: "United States of America",
			longDesc: "The best country in the world according to many!",
			image: "data:image/png;base64,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",
			lat: "37.09024",
			lng: "-95.712891",
			name: "USA",
			place_id: "ChIJCzYy5IS16lQRQrfeQ5K5Oxw",
			oneliner: "Country",
			itemType: "country",
			updatedAt: "1460648462"
		}
	},
	{
		id: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
		type: 'item',
		attributes: {
			ancestryNames: "France",
			ancestry: "ChIJMVd4MymgVA0R99lHx5Y__Ws",
			address: "Paris, France",
			longDesc: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its picturesque 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture, and designer boutiques along the Rue du Faubourg Saint-Honoré.",
			image: "data:image/jpeg;base64,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",
			lat: "48.85661400000001",
			lng: "2.3522219000000177",
			name: "Paris",
			place_id: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
			oneliner: "Capital of France",
			itemType: "locality",
			updatedAt: "1460348462"
		}
	},
	{
		id: "ChIJl4foalHq9EcR8CG75CqrCAQ",
		type: 'item',
		attributes: {
			ancestryNames: "France",
			ancestry: "ChIJMVd4MymgVA0R99lHx5Y__Ws",
			address: "Lyon, France",
			longDesc: "Lyon is France's capital of gastronomy",
			image: "data:image/jpeg;base64,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",
			lat: "44.85661400000001",
			lng: "1.8522219000000177",
			name: "Lyon",
			place_id: "ChIJl4foalHq9EcR8CG75CqrCAQ",
			oneliner: "City in France",
			itemType: "locality",
			updatedAt: "1460738462"
		}
	},
	{
		id: "tmp1",
		type: 'collection',
		attributes:{
			name: "itai's collection"
		},
		relationships: {
			items: {
				data: [
					{ type: 'item', id: "ChIJD3uTd9hx5kcR1IQvGfr8dbk" },
					{ type: 'item', id: "ChIJdbbQwbZx5kcRs7Qu5nPw18g" }
				]
			},
			dates: {
				data: [
					{type: 'date', id: 'asdas'}
				]
			}
		}
	},
	{
		id: "tmp2",
		type: 'collection',
		attributes:{
			name: "itai's other collection"
		},
		relationships: {
			items: {
				data: [
				]
			}
		}
	},
	{
		id: "https://www.google.com/search?q=Louvre&oq=louvre",
		type: 'potentialLink',
		attributes: {
			createdAt: '1460248462',
			lastVisited: '1460248462',
			//note: "The Louvre Palace is a former royal palace located on the Right Bank of the Seine in Paris, between the Tuileries Gardens and the church of Saint-Germain l'Auxerrois. Wikipedia asdkjashkd",
			note: '12345',
			image: "https://lh5.googleusercontent.com/-HIc3V6HYPg4/VrXryykTJ2I/AAAAAAAAmVo/adAXMHlv0Pw/w3000-k/",
			title: 'louvre museum - the full website',
			description: ' I dont know what the desc is for really'
		},
		relationships: {
			item: {
				data: { type: 'item', id: "ChIJD3uTd9hx5kcR1IQvGfr8dbk" }
			}
		}
	},
	{
		id: "http://www.lonelyplanet.com",
		type: 'potentialLink',
		attributes: {
			createdAt: '1460248462'
		},
		relationships: {
			item: {
				data: { type: 'item', id: "ChIJD3uTd9hx5kcR1IQvGfr8dbk" }
			}
		}
	},
	{
		id: "asdas",
		type: 'date',
		attributes: {
			order: '1'
		},
		relationships: {
			collection: {
				data: { type: 'collection', id: "tmp1" }
			},
			trippoints: {
				data: [
					{type: 'trippoint', id : 'adasdas'},
					{type: 'trippoint', id : 'adasdas2'}
				]
			}
		}
	},
	{
		id: "adasdas",
		type: 'trippoint',
		attributes: {
			order: '1'
		},
		relationships: {
			date: {
				data: { type: 'date', id: "asdas" }
			},
			item: {
				data: {type: 'item', id: 'ChIJdbbQwbZx5kcRs7Qu5nPw18g'}
			}
		}
	},
	{
		id: "adasdas2",
		type: 'trippoint',
		attributes: {
			order: '2'
		},
		relationships: {
			date: {
				data: { type: 'date', id: "asdas" }
			},
			item: {
				data: {type: 'item', id: 'ChIJD3uTd9hx5kcR1IQvGfr8dbk'}
			}
		}
	}

]};




var formatPlace = function(place){
	if (place.ancestryNames && place.ancestryNames.length > 0){
		var path = place.ancestryNames + "/" + place.name
	} else {
		var path = place.name
	}
	path = path.replace(/\//g, "_");
	var item = {
		id: place.place_id,
		type: 'item',
		attributes: place
	};
	/*if (["ChIJD3uTd9hx5kcR1IQvGfr8dbk", "ChIJdbbQwbZx5kcRs7Qu5nPw18g"].indexOf(place.place_id) > -1) {
		item = $.extend(item, {
				relationships: {
					collections: {
						data: [
							{type: "collection", id: "1"}
						]
					}
				}
			}
		)
	}*/
	return item;
};


export function initialize(applicationInstance) {
	let store = applicationInstance.lookup('service:store');
	if (chrome.extension) {
		var backgroundPage = chrome.extension.getBackgroundPage();
		var trackedPlaces = backgroundPage.TripMinder.trackedPlaces;
		var formattedData = Object.keys(trackedPlaces)
			.map(function (key) {
				return trackedPlaces[key].item
			})
			.map(function (place) {
				return formatPlace(place)
			});
	} else if (ENV.environment === 'development') {
		localforage.getItem('DS.LFAdapter').then(function(result){
			if (!result || !result.item || result.item.records.length == 0 ) {
				store.push(addlData);
				var array = ['item', 'potential-link', 'collection', 'date', 'trippoint']
				array.forEach(function(type){
					store.findAll(type).then(function(records){
						records.forEach(function(record){
							record.save();
						})
					})
				})

			}
		});
	}
	if (formattedData) store.push({data: formattedData});
};


export default {
	name: 'load-data',
	initialize: initialize
};