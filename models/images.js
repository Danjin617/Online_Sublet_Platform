var mongoose = require('mongoose');

// define our users model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Image', {
   img: { 
   	data: {type: Buffer, default: []},
   	contentType: {type: String, deafult: 'image/png'}
   },
   listing_id: {type: String, default: ''}
});
