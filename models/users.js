var mongoose = require('mongoose');

// define our users model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', {
   username : {type : String, default: ''},
   password: {type : String, default: ''},
   confirmed: {type : Boolean, default: false},
   email: {type : String, default: ''},
   token: {type : String, default: ''},
   bookmarked: {type : [String], default: []},
});
