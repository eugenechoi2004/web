#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();

var hbs = require('hbs')
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

app.set('view engine','hbs')

app.use(
    express.static('static_files')
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const home = require('./routes/home.js')
const weather = require('./routes/weather2.js')
const cereal = require('./routes/cereal.js')
app.use(home)
app.use(weather)
app.use(cereal)

app.get('*', function(req, res) {
    return res.render('invalid_template')
})


// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});
