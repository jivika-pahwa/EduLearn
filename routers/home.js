var express = require('express');
var session = require('express-session');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var sess;
var conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'edulearn'
});

router.get('/',function(request,response){
  var sql = "SELECT * FROM subject LIMIT 3";
  conn.query(sql,function(err,rows){
    if(err){ console.log(err);
    }
    else {
      response.render('home',{title:'EduLearN',subjects:rows});
    }
  });
});

module.exports = router;
