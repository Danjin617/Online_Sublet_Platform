var mongoose = require('mongoose');

// define our users model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Image', {
   img: { type:String, default:''},
   listing_id: {type: String, default: ''}
});
