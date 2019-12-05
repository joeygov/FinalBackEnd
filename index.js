const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const Bcrypt = require("bcryptjs");
const multer = require("multer");
const cors = require("cors");
const port = 5000

const pusher = require('pusher');

// Create express app
const app = express();
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// Parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

const dbConfig = 'mongodb://127.0.0.1:27017/abangDB';
const db = mongoose.connection;

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig, { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log("Connected to dbs.");
}).catch(err => {
  console.log('Cannot connect to dbs.', err);
  process.exit();
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// ------------------------------------------------------------

// Import Models

// const AccountsUsers = require('./models/model.accountsUsers.js');
// const AccountsProvider = require('./models/model.accountsProvider.js');
// const Reservation = require('./models/model.reservation.js');
// const Items = require('./controller/items.controller.js');
//import controller
const createUser = require('./controller/accountsUsers.controller.js');
//const test = require('./models/model.test.js');

// app.get('/pusher',(req,res)=>{
//    var pusher = new Pusher({
//     app_id : '906629',
//     key : '5dd0d9748bc2e0e4bb9a',
//     secret : 'a0cd9c898742534c16f3',
//     cluster : 'ap1',
//     encrypted : true
//    });
//    var data = {
//      'data': {
//        req.query
//      }
//    }
//   pusher.trigger('my-channel', 'my-event', {
//      'data':{
//        data
//      }

//   })
// })

app.post('/accountsUsers', function (req, res) {
  console.log(req.body)
  createUser.create(req, res);
});
app.get("/login", createUser.AllUsers);



const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false)
  }
  cb(null, true);
}

const upload = multer({
  dest: './uploads',
  fileFilter,
  limits: {
    fileSize: 5000000
  }
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

app.use((err, req, res, next) => {
  if (err.code === "INCORRECT_FILETYPE") {
    res.status(422).json({ error: 'Only images are allowed' });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: 'Allow file size is 500KB' });
    return;
  }
});


// ------------------------------------------------------------
// listen for requests
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});