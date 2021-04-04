var express = require('express');
var session = require('express-session');
var app = express();
var datafile = require('./data/data.json');
var tutorialfile = require('./data/tutorial.json');
var quizfile = require('./data/quiz.json');

app.use(require('./routers/home'));
app.use(require('./routers/courses'));
app.use(require('./routers/userlogin'));
app.use(require('./routers/userprofile'));
app.use(require('./routers/quiz'));


app.set('view engine','ejs');
app.set('views','views');

app.engine('html',require('ejs').renderFile);
app.set('appData',datafile);
app.set('tutorialData',tutorialfile);
app.set('quizData',quizfile);

app.locals.alltutorials = datafile.tutorials;


var mysql = require('mysql');
var conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'edulearn'
});
  conn.connect(function(err){
    if(err) {
      console.log(err);
    }
    else {
          console.log('connected to server');
        }
      });

app.use(express.static('public'));

var Server = app.listen(3000,function(){
  console.log("welcome to edulearn at 3000");
});
