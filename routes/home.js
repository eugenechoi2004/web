const express = require('express');
var app = express.Router();


app.get('/win', function(req,res){
    return res.render('win_template')
})

app.get('/lose', function(req,res){
    return res.render('lose_template')
})

app.get('/second', function(req,res){
    var obj = {
     'somekey' : 'Hello World, it works!'
   }
    return res.render('second_template',obj)
})

app.get('/third', function(req,res){
   var obj = {
       'message':'Hello!',
       'delay_time':3000
   }
   return res.render('third_template', obj);
});

app.get('/chance',function(req,res){
    var random = Math.random()
    if (random < 0.5){
        return res.render('win_template')
    }
    else{
        return res.render('lose_template')
    }

})

app.get('/something_styled',function(req,res){
  return res.render('lose_template')
})

app.get('/list_render', function(req,res){
   var obj = { 
       thingz: [
    "Yehuda Katz",
    "Alan Johnson",
    "Charles Jolley"
  ]
   }
   res.render('list_template', obj);
});

app.get('/madlib',function(req,res){
    return res.render('madlib_template')
})

app.post('/madlib',function(req,res){
    console.log(req.body)
    return res.render('madlib_template',req.body)
})

app.get('/numbers/:digit',function(req,res){
    console.log(req.params.digit)
    digit = req.params.digit
    if (!isPositiveInteger(digit)){
        return res.render('invalid_template')
    }
    obj = {'digit':digit,
           'squared': Math.pow(digit,2),
            'cubed': Math.pow(digit,3),
            'power4': Math.pow(digit,4)
        }
    if (req.query['format']=='json'){
        return res.json(obj)
    }
    return res.render('number_template', obj)
})

function isPositiveInteger(str) {
    if (typeof str !== 'string') {
      return false;
    }
    const num = Number(str);
    if (Number.isInteger(num) && num > 0) {
      return true;
    }
    return false;
  }


app.get('*', function(req, res) {
    return res.render('invalid_template')
})

app.get('*', function(req, res) {
    return res.render('invalid_template')
})

module.exports = app