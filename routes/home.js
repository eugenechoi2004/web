const express = require('express');
var assert = require('assert');
const { nextTick } = require('process');
var app = express.Router();

app.get('/', function(req,res){
    return res.render('index_template')
})

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




module.exports = app