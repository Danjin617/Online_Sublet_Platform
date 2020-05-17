var mongoose = require('mongoose');

// define our students model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Listing', {
   name : {type : String, default: ''},
   place: {type : String, default: ''},
   country: {type : String, default: ''}
});
