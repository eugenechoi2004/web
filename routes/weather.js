const express = require('express');
var assert = require('assert');
const { nextTick } = require('process');
var app = express.Router();

const https = require('https');



var options = { 
	headers : {
		'User-Agent': 'request'
	}
}
// https://api.weather.gov/points/42.9356,-78.8692

module.exports = app

app.use("/getweather", function(req, res) {
    try{
        var lat = req.query.lat
        var long = req.query.long
        assert.equal(isValidFloat(lat),true)
        assert.equal(isValidFloat(long),true)
        console.log("hello")
        var url = "https://api.weather.gov/points/"+lat+","+long
        try{
        https.get(url,options, function(response) {
            var rawData = '';
            response.on('data', function(chunk) {
               rawData += chunk;
            });
            response.on('end', function() {
               var obj = JSON.parse(rawData);
               url = obj.properties.forecast
               getForecast(url)
            });
         })
        }
        catch{
            return res.render('index_template')
        }
        
    }
    catch{
        return res.render('invalid_template')
    }
    next()
})

// function getForecast(url){
//     https.get(url,options, function(response) {
//         var rawData = '';
//         response.on('data', function(chunk) {
//            rawData += chunk;
//         });
//         response.on('end', function() {
//            var obj = JSON.parse(rawData);
//            console.log(obj)
//         });
//      }).on('error', function(e) {
//         console.error(e);
//      });
//      return res.render('number_template')
// }


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

app.get('/getweather', function(req, res) {
    return res.render('weather_template')
})


/*
    checks
    there are values existing
    no missing key
    need to make sure there is forecast available
    is number
    is in the US and can be requested by the api
    it is not more than four decimcal places accurate
*/