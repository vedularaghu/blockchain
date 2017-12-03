var express = require('express');
var session = require('express-session');
const bcrypt = require('bcrypt');
const aadhar_st = require('../models/aadhar');
const birth_st = require('../models/birth');

var router = express.Router();
const user = 'admin';
const pass = '$2a$10$uL09gFqwJpk9q7OU2j9K8.mq011rgYqUSJvnQfLw2cIWuTeoatiYm';
const saltRounds = 10;
const aadhar_list= [];
const birth_list = [];
// router.use(session({secret: "Your secret key"}));
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index',{message:null});
});

function isAuthenticated(req,res,next) {
  console.log(req.session.user);
  if (!req.session.user) {
      res.send('You are not authorized to view this page');
      console.log(req.session);
      console.log(req.session.cookie.maxAge);
    } else {
      next();
    }
}
router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  if (username == user) {
    bcrypt.compare(password, pass).then((result)=> {
      if (result){
        req.session.user = username;
        req.session.save();
        // console.log(req.body);
        res.redirect('/dashboard');
      }
      else {
        res.render('index', {message:"error"});
      }
    }).catch((err)=> {next(err);});
  }
  else {
    // res.send("Bad Username or Password");
    res.render('index', {message:"error"});
  }
});

router.post('/aadhar', function(req, res, next) {
  var name = req.body.nameaadhar;
  var an = req.body.aadharnum;
  var tohash = name+an;
  console.log(tohash);
  bcrypt.hash(tohash, saltRounds, function(err, hash) {
    res.render('result');
    console.log(hash);
    const A = new aadhar_st({
      Name: name,
      aadhar_number: an,
      unique_hash: tohash,
    }).save();
    aadhar_list.push({name:name,aadhar_hash: hash});
});

});
router.post('/birth', function(req, res, next) {
  var name = req.body.namebirth;
  var birthdate = req.body.date;
  var tohash = name+birthdate;
  console.log(tohash);
  bcrypt.hash(tohash, saltRounds, function(err, hash) {
    res.render('result');
    console.log(hash);
    const B = new aadhar_st({
      Name: name,
      Birthdate: birthdate,
      unique_hash: tohash,
    }).save();
    birth_list.push({name:name, birth_hash:hash})
});

});

router.get('/dashboard', isAuthenticated, function(req, res) {
  res.render('dashboard');
});
router.get('/my-page', isAuthenticated, function(req,res) {
  res.render('page');
});
router.get('/register-birth', isAuthenticated, function(req,res) {
  res.render('register1');
});
router.get('/register-aadhar', isAuthenticated, function(req,res) {
  res.render('register2');
});

router.get('/logout', function (req, res) {
  delete req.session.user;
  res.redirect('/');
});

module.exports = router;
