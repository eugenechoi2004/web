const express = require('express');
var assert = require('assert');
const https = require('https');
const { nextTick } = require('process');
var app = express.Router();

let options = { 
	headers : {
		'User-Agent': 'request'
	}
}

function isValidFloat(str) {
    try {
      const num = Number(str);
      if (!str.includes(".") || num.toString().split(".")[1].length <= 4) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
}

function valid(req,res,next) {
    try{
        var lat = req.query.lat
        var long = req.query.long
        console.log(lat)
        console.log(long)
        assert.equal(isValidFloat(lat),true)
        assert.equal(isValidFloat(long),true)
        res.locals.url = "https://api.weather.gov/points/"+lat+","+long
    }
    catch{
        return res.render('weather_template',{message:"Try Again!"})
    }
    next()
}
 
function stepTwo(req,res,next) {
  
    https.get(res.locals.url,options, function(response) {
      var rawData = '';
      response.on('data', function(chunk) {
        rawData += chunk;
      });
      response.on('end', function() {
        var obj = JSON.parse(rawData);
        url = obj.properties.forecast
        res.locals.url = url
        next()
      });
 })
    
}

function stepThree(req,res,next) {
    console.log('Start of Step Three')
    console.log(res.locals.url)
    https.get(res.locals.url,options, function(response) {
      var rawData = '';
      response.on('data', function(chunk) {
        rawData += chunk;
      });
      response.on('end', function() {
        var obj = JSON.parse(rawData);
        var periods = obj.properties.periods
        for (i=0; i < periods.length; i++) {
            console.log(periods[i])
        }
      });
 })
    next()
}
 
app.get('/getweather', [valid, stepTwo, stepThree],function(req,res){
    return res.render('weather_template')
})


module.exports = app