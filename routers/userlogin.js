var express = require('express');
var session = require('express-session');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
router.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
router.use(bodyParser());
var sess; //session global variable

var conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'edulearn'
});

router.get('/userlogin',function(request,response){
  response.render('userlogin.html',{title:'login page'});

});
router.post('/submit',function(request,response){
  var data = request.app.get('appData');
  var pageTutorial = data.tutorials;
    sess = request.session;
    sess.name = request.body.name;
    sess.email = request.body.email;
    sess.password = request.body.password;
  var sql = "INSERT into login(name,email,password) values ('"+request.body.name+"','"+request.body.email+"','"+request.body.password+"')";

  conn.query(sql,function(err,rows){
    if(err){
      console.log(err);
    }
    else {
      response.render('courses',{title:'All Courses',friends: pageTutorial,details:sess.name});
    }
  })
});
router.post('/submit2',function(request,response){
  sess = request.session;
  sess.name = request.body.name;
  sess.password = request.body.password;
   var name = request.body.name;
  var password = request.body.password;
  var data = request.app.get('appData');
  var pageTutorial = data.tutorials;
  if(name && password) {
    var sql = "SELECT * from login where name = '"+request.body.name+"' and password = '"+request.body.password+"' ";
    conn.query(sql,function(err,rows){
      if(rows.length>0){
          response.render('courses',{details:sess.name,title:'All Courses',friends: pageTutorial});
            }
      else {
        response.send('kindly sign up first');}
        response.end();
    })
  }

});
module.exports = router;
