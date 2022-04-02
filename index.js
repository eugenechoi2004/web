#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();
var mysql = require('mysql');
var hbs = require('hbs')
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
app.set('view engine','hbs')


app.use(
    express.static('static_files')
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var sql_params = {
    connectionLimit : 10,
    user            : process.env.DIRECTOR_DATABASE_USERNAME,
    password        : process.env.DIRECTOR_DATABASE_PASSWORD,
    host            : process.env.DIRECTOR_DATABASE_HOST,
    port            : process.env.DIRECTOR_DATABASE_PORT,
    database        : process.env.DIRECTOR_DATABASE_NAME
  }
  
var pool  = mysql.createPool(sql_params);


const home = require('./routes/home.js')
const weather = require('./routes/weather2.js')
const puppy = require('./routes/puppy.js')
app.use(home)
app.use(weather)
app.use(puppy)



app.get('*', function(req, res) {
    return res.render('invalid_template')
})


// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});
