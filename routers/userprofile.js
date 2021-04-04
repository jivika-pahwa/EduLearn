var express = require('express');
var session = require('express-session');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
router.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
router.use(bodyParser());
var sess;
var conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'edulearn'
});

  router.get('/userprofile',function(request,response){
  // response.locals.session = request.session;
  sess = request.session.name;
  var data = request.app.get('appData');
  var pageTutorial = data.tutorials;
  response.render('userprofile',{title:'user profile',friends: pageTutorial,details:sess});
  });

  router.get('/logout',function(request,response){
    if(request.session) {
    request.session.destroy(function(err) {
      if(err)  return console.log(err);
        return  response.redirect('/');
        });
  }
  });
module.exports = router;
