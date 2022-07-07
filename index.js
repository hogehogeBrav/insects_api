var exp = require("express");
var app = exp();
var config = require("./config/host");

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: config.dbHost,
  port: config.dbPort,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbDatabase
});

app.get("/insects", function (req, res) {
  connection.query('select * from insects', function (error, results, fields) {
      if (error) throw error;
      res.send(results);
  });
});

app.get("/insects/:insects_id", function (req, res) {
  connection.query('select * from insects where insect_id = ' + req.params.insects_id, function (error, results, fields) {
      if (error) throw error; 
      res.send(results);
  });
});

app.listen(config.apiPort , function(){
    console.log("成功")
})
