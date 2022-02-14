#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();

var hbs = require('hbs')
app.set('view engine','hbs')

app.use(
    express.static('static_files')
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});