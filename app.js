var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt')
const saltRounds = 10

app.use(cors())

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mydb'
});

app.post('/login',jsonParser, function(req, res, next){
  
})

app.post('/register', jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    // execute will internally call prepare and query
    connection.execute(
      'INSERT INTO user (email, password, fname, lname) VALUES (? , ?, ?, ?)',
      [req.body.email, hash, req.body.fname, req.body.lname],
      function (err, results, fields) {
        if (err) {
          res.json({ status: 'error', message: err })
          return
        }
        res.json({ status: 'Success' })
      }
    )
  })
})

app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})