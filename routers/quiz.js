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
  router.get('/quiz',function(request,response){
  // response.locals.session = request.session;
  sess = request.session.name;
  if(request.session.name === null ){
    response.redirect('/userlogin');
  };
  var data = request.app.get('appData');
  var pageTutorial = data.tutorials;
  response.render('quiz',{title:'Quizzes',friends: pageTutorial,details:sess});
  });

  router.get('/quiz/:quizid',function(request,response){
    //sess = request.session;
    if(request.session.name == null) {
      response.redirect('/userlogin');
    }
    sess = request.session.name;
    var data = request.app.get('quizData');
    var pageTutorial = [];
    data.tutorials.forEach(function(item) {
      if(item.shortname == request.params.quizid) {
        pageTutorial.push(item);
      }
    });
    response.render('quizBegin',{title:'Questions',friends: pageTutorial,details:sess });
  });

module.exports = router;
