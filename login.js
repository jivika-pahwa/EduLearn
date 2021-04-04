var express = require('express');
var session = require('express-session');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser());
var sess;
app.set('view engine','ejs');
app.set('views','views');

var conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'edulearn'
});

app.get('/',function(request,response){
  // sess = request.session;
  // sess.name;
  // sess.email;
  // sess.password;
response.render('login');
});
app.post('/submit',function(request,response){
  sess = request.session;
  sess.name = request.body.name;
  // sess.email = request.body.email;
    var sql = "INSERT into login(name,password,email) Values ('"+request.body.name+"','"+request.body.password+"','"+request.body.email+"')";
  conn.query(sql,function(err,rows){
    if(err){
      console.log(err);
    }
    else {
      response.render('welcome',{detail : sess.name});
    }
  })
});
var Server = app.listen(8000,function(){
  console.log("listen to login page");
});
