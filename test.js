var assert = require('assert');
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

function call(lat,long){
  
  assert.equal(isValidFloat(lat),true)
  assert.equal(isValidFloat(long),true)
  var url = "https://api.weather.gov/points/"+lat+","+long
  console.log(url)
  https.get(url,options, function(response) {
      var rawData = '';
      console.log('hello')
      response.on('data', function(chunk) {
          rawData += chunk;
      });
      response.on('end', function() {
          var obj = JSON.parse(rawData);
          url = obj.properties.forecast
          console.log(rawData)
          getForecast(url)
      });
    })
}
call('55','43')