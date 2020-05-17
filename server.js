// modules =================================================
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
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
      res.json(users); // return all students in JSON format
    });
});


/* app.post('/api/students/send', function (req, res) {
   var student = new Student(); // create a new instance of the student model
   student.name = req.body.name; // set the student name (comes from the request)
   student.place = req.body.place; // set the student name (comes from the request)
   student.country = req.body.country; // set the student name (comes from the request)
   student.save(function(err) {
      if (err)
         res.send(err);
         res.json({ message: 'student created!' });
   });
});

const user = await User.find({username: req.body.username})
 
  if (user.length == 0) {
    return res.json({message: 'Cannot find user'});
  }

  */

  
  
  app.post('/users', async (req, res) => {
  const user = await User.find({username: req.body.username})
   if (user.length == 0){
    
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        var new_user = new User();
        new_user.username = req.body.username;
        new_user.password = hashedPassword;

        new_user.save(function(err) {
          if (err)
            res.send(err);
          res.json({message: 'user created!'});
        });
      }
      catch {
        res.status(500).send()
      }
      
    } 
    else {
     res.json({message: 'user exists'});
    }
  });

/*
app.post('/users/login', async (req, res) => {
  await User.find({username: req.body.username}, async function (err, users) {
    if (users == null) {
      return res.status(400).send('Cannot find user')
    }
    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
        res.send('Success')
      } else {
        res.send('Not Allowed')
      }
    } catch {
      res.status(500).send()
    }
  });
});
*/
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
      alert("try again");
      res.json({message: 'Incorrect Password'});
    }
  } catch {
    res.json({message: 'Incorrect Password'});
  }
})


// sample api route
// grab the student model we just created
var Student = require('./models/students');


//var student =  { name: 'Bob' , place: 'Ross', country: 'Canada'};
//Student.create(student,function(err, students) {

//});


app.get('/api/students', function(req, res) {
   // use mongoose to get all students in the database
   Student.find(function(err, students) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
       res.send(err);
      res.json(students); // return all students in JSON format
    });
 });

app.post('/api/students/send', function (req, res) {
   var student = new Student(); // create a new instance of the student model
   student.name = req.body.name; // set the student name (comes from the request)
   student.place = req.body.place; // set the student name (comes from the request)
   student.country = req.body.country; // set the student name (comes from the request)
   student.save(function(err) {
    if (err)
     res.send(err);
   res.json({ message: 'student created!' });
 });
 });


app.delete('/api/students/:student_id', function (req, res) {
 Student.remove({
  _id: req.params.student_id
}, function(err, bear) {
  if (err)
   res.send(err);
 res.json({ message: 'Successfully deleted' });
});
});

app.get('/api/students/:student_id', function (req, res) {
 Student.findById(req.params.student_id, function (err, post) {
  if (err) res.send(err);
  res.json(post);
});
});

app.put('/api/students/:student_id', function (req, res) {
 Student.findByIdAndUpdate(req.params.student_id, req.body, function (err, post) {
  if (err) res.send(err);
  res.json({message: "successfully saved"});
});
});


// startup our app at http://localhost:3000
app.listen(port, function () {
  console.log('listening: http://localhost:' + port + '/');
});
