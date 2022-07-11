var exp = require("express");
var app = exp();
var config = require("./config/host");

var mysql = require("mysql2");
var connection = mysql.createPool({
  host: config.dbHost,
  port: config.dbPort,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbDatabase
});

app.get("/insects", function (req, res) {
  connection.query('select * from insects', function (error, results, fields) {
    if (error) {
      console.log(error);
      res.send({ success: false, message: 'query error', error: error });
    } else {
      res.send({ success: true, results });
    }
  });
});

app.get("/insects/:insects_id", function (req, res) {
  connection.query('select * from insects where insect_id = ' + req.params.insects_id , function (error, results, fields) {
    if (error) {
      console.log(error);
      res.send({ success: false, message: 'query error', error: error });
    } else {
      if (results.length > 0) {
        res.send({ success: true, results });
      } else {
        res.send({ success: false, message: 'insect not found' });
      }
    }
  });
});

app.listen(config.apiPort , function(){
    console.log("成功")
});
