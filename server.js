const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', function(req,res){
  res.sendFile(__dirname+"/index.html"); 
})

app.post("/", function (req, res) {

    var email = req.body.email
    var pass = req.body.pass

  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Sanku@2003",
    database: "test",
  });

  connection.connect(function (err) {
    if (err) {
      console.log("error occurred while connecting");
    } else {
      console.log("connection created with Mysql successfully");
    }
  });

  connection.query(`insert into test1(name,roll) values('${email}', ${pass});`, function (err, result, fields) {
    if(err){
      console.log(err);
    }
    console.log(result);
    result
    console.log(fields);

  });

  connection.query('Select * from test1', function(err,result, fields){
    console.log(result);
  })

  connection.end();

  res.redirect('/');
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});