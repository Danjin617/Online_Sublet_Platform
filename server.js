// modules =================================================
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');

// set our port
const port = 3030;
//app.get('/', (req, res) => res.send('Welcome to Tutorialspoint!'));

// configuration =========================================== 
// configure body parser
app.use(bodyParser.json()); // parse application/json

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request.
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));


// config files
var db = require('./config/db');
console.log("connecting--",db);
mongoose.connect(db.url); //Mongoose connection created


app.use(express.json());



var User = require('./models/users');

app.get('/users', (req, res) => {
 User.find(function(err, users) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
       res.send(err);
      res.json(users); // return all listings in JSON format
    });
});


app.post('/users', async (req, res) => {
  const user = await User.find({username: req.body.username})
  if (user.length == 0){

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      var new_user = new User();
      new_user.username = req.body.username;
      new_user.password = hashedPassword;
      new_user.email = req.body.email;
      //console.log(new_user.email);
      const emailToken = jwt.sign({
        _id: new_user._id
      },process.env.ACCESS_TOKEN_SECRET);
      new_user.token = emailToken;
      
      const url = `http://localhost:3030/#/confirmation/${emailToken}`;
     // console.log(url);
   

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
   
      const mailOptions = {
  from: process.env.EMAIL, // sender address
  to: new_user.email, // list of receivers
  subject: 'Confirmation Email', // Subject line
  html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`// plain text body
};
console.log('BEFORE');
  await  transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log('EMAIL SENTTTT');
});
console.log('AFTER');
      new_user.save(function(err) {
        if (err)
          res.send(err);
        //res.json({message: 'http://localhost:3030/#/confirmation/${emailToken}'});
        res.json(new_user);
      });
    }
    catch (e) {
      console.log(e);
     // res.status(500).send()
    }

  } 
  else {
   res.json({message: 'user exists'});
 }
});


app.post('/users/login', async (req, res) => {
  //res.send('TEST1');
  const user = await User.find({username: req.body.username})

  if (user.length == 0) {
    return res.json({message: 'Cannot find user'});
  }
  try {
    if(await bcrypt.compare(req.body.password, user[0].password)) {
      res.json(user[0])
    } else {
      //alert("try again");
      res.json({message: 'Incorrect Password'});
    }
  } catch {
    res.json({message: 'Incorrect Password'});
  }
})

app.delete('/users/:user_id', function (req, res) {
 User.remove({
  _id: req.params.user_id
}, function(err, bear) {
  if (err)
   res.send(err);
 res.json({ message: 'Successfully deleted' });
});
});

// sample api route
// grab the listing model we just created
var Listing = require('./models/listings');


app.get('/api/listings', function(req, res) {
   // use mongoose to get all listings in the database
   Listing.find(function(err, listings) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
       res.send(err);
      res.json(listings); // return all listings in JSON format
    });
 });

/*
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
   */
   app.post('/api/listings/send', function (req, res) {
   var listing = new Listing(); // create a new instance of the listing model
   listing.address.streetname = req.body.address.streetname; // set the listing name (comes from the request)
   listing.address.postal_code = req.body.address.postal_code;
   listing.address.city = req.body.address.city;
   listing.address.province = req.body.address.province;
   listing.address.country = req.body.address.country;

   listing.timeframe.start_date = req.body.timeframe.start_date;
   listing.timeframe.end_date = req.body.timeframe.end_date;

   listing.features.utilities = req.body.features.utilities;
   listing.features.furnished = req.body.features.furnished;
   listing.features.en_suite = req.body.features.en_suite;
   listing.features.public_transport = req.body.features.public_transport;
   listing.features.pets = req.body.features.pets;

   listing.type = req.body.type;
   listing.demographic = req.body.demographic;
   listing.bed = req.body.bed;
   listing.bath = req.body.bath;
   listing.area = req.body.area;
   listing.price = req.body.price;
   listing.description = req.body.description;
   listing.lister = req.body.lister;
   listing.images = req.body.images;

   listing.save(function(err) {
    if (err)
     res.send(err);
   res.json({ message: 'listing created!' });
 });
 });


   app.delete('/api/listings/:listing_id', function (req, res) {
     Listing.remove({
      _id: req.params.listing_id
    }, function(err, bear) {
      if (err)
       res.send(err);
     res.json({ message: 'Successfully deleted' });
   });
   });

   app.get('/api/listings/:listing_id', function (req, res) {
     Listing.findById(req.params.listing_id, function (err, post) {
      if (err) res.send(err);
      res.json(post);
    });
   });

   app.put('/api/listings/:listing_id', function (req, res) {
     Listing.findByIdAndUpdate(req.params.listing_id, req.body, function (err, post) {
      if (err) res.send(err);
      res.json({message: "successfully saved"});
    });
   });


// startup our app at http://localhost:3000
app.listen(port, function () {
  console.log('listening: http://localhost:' + port + '/');
});



