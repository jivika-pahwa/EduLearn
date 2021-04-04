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

router.get('/courses',function(request,response){
  sess = request.session.name;
  var data = request.app.get('appData');
  var pageTutorial = data.tutorials;
  response.render('courses',{title:'All Courses',friends: pageTutorial,details:sess});
  });

router.get('/courses/:coursesid',function(request,response){
  //sess = request.session;
  if(request.session.name == null) {
    response.redirect('/userlogin');
  }
  sess = request.session.name;
  var data = request.app.get('appData');
  var pageTutorial = [];
  data.tutorials.forEach(function(item) {
    if(item.shortname == request.params.coursesid) {
      pageTutorial.push(item);
    }
  });
  response.render('tutorial', {title:'All Courses Info',friends: pageTutorial,details:sess });
});

router.get('/courses/:coursesid/:tutorialid',function(request,response){
  var tutorials = request.app.get('tutorialData');
  sess = request.session.name;
  var modules = [];
  tutorials.Chapters.forEach(function(item) {
    if(item.name == request.params.tutorialid) {
      modules.push(item);
    }
  });
  response.render('gotocourse', {title:'Tutorial info',Lessons:modules,details:sess});
});
module.exports = router;
