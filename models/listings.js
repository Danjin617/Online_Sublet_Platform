var mongoose = require('mongoose');

// define our students model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Listing', {
	address: {
		streetname : {type : String, default: ''},
		postal_code : {type : String, default: ''},
		city : {type : String, default: ''},
		province : {type : String, default: ''},
		country : {type : String, default: ''}
	},
	timeframe: {
		start_date : {type : Date, default: ''},
		end_date : {type : Date, default: ''},
	},
	features: {
		utilities: {type : Boolean, deafult: ''},
		furnished: {type : Boolean, deafult: ''},
		en_suite: {type : Boolean, deafult: ''},
		public_transport: {type : Boolean, deafult: ''},
		pets: {type : Boolean, deafult: ''},
	},
   type : {type : String, default: ''}, // aprtments, houses, townhouses, dormitory, lofts,
   demographic: {type : String, deafult: ''}, //male, female, coed
   bed: {type : Number, default: ''},
   bath: {type : Number, default: ''},
   area: {type : Number, default: ''},
   price: {type : Number, default: ''},
   lister : {type : String, default: ''},
   images: {type: [String], default: ['https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg?fit=scale']},
});
