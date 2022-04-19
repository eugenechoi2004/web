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
    try{
        https.get(res.locals.url,options, function(response) {
          var rawData = '';
          response.on('data', function(chunk) {
            rawData += chunk;
          });
          response.on('end', function() {
            try{
                var obj = JSON.parse(rawData);
                url = obj.properties.forecast
                res.locals.url = url
                next()
            }
            catch{
                return res.render('weather_template',{message:"Try Again!"})
            }
          });
        })
    }
    catch{
        return res.render('weather_template',{message:"Try Again!"})
    }
    
}

function stepThree(req,res,next) {
    try{
        console.log('Start of Step Three')
        console.log(res.locals.url)
        if (res.locals.url!=null){
            https.get(res.locals.url,options, function(response) {
              var rawData = '';
              response.on('data', function(chunk) {
                rawData += chunk;
              });
              response.on('end', function() {
                var obj = JSON.parse(rawData);
                var periods = obj.properties.periods
                console.log(periods[0]['icon'])
                console.log(periods[0]['shortForecast'])
                var output = {
                    message:'Success!',
                    icon : periods[0]['icon'],
                    temp : periods[0]['temperature'],
                    forecast : periods[0]['shortForecast']
                }
                res.locals.output = output
                next()
              });
            })
        }
        else{
            return res.render('weather_template',{message:"Try Again!"})
        }
    }
    catch{
        return res.render('weather_template',{message:"Try Again!"})
    }
}

function stepFour(req,res,next) {
    return res.render('weather_template',res.locals.output)
}
 
app.get('/getweather', [valid, stepTwo, stepThree,stepFour],function(req,res){
    return res.render('weather_template')
})


module.exports = app