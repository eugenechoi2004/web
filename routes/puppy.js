const express = require('express');
var assert = require('assert');
const { nextTick } = require('process');
var app = express.Router();
var mysql = require('mysql');
const https = require('https');

module.exports = app

var sql_params = {
    connectionLimit : 10,
    user            : process.env.DIRECTOR_DATABASE_USERNAME,
    password        : process.env.DIRECTOR_DATABASE_PASSWORD,
    host            : process.env.DIRECTOR_DATABASE_HOST,
    port            : process.env.DIRECTOR_DATABASE_PORT,
    database        : process.env.DIRECTOR_DATABASE_NAME
  }
  
var pool  = mysql.createPool(sql_params);



app.get('/puppy',
function(req,res){
    var sql = 'SELECT * FROM puppies;'
    pool.query(sql, function(error, results, fields){
        if (error) throw error;
        var odin = results[0].upvotes-results[0].downvotes
        var thor = results[1].upvotes-results[1].downvotes
        var params = {
        	'odin' : odin,
        	'thor': thor
        }
        res.render('puppy_template',params)
    }) 
 })
 
 
app.post('/puppy',
function(req,res){
    var votes = 'upvotes=upvotes+1'
    var name = '"Odin"'
    var params = req.body
    if ('vote-odin' in params){
        name = '"Odin"'
        if(params['vote-odin']=='up'){
            votes = 'upvotes=upvotes+1'
        }
        else{
            votes = 'downvotes=downvotes+1'
        }
    }
    else{
        name = '"Ryan"'
        if(params['vote-thor']=='up'){
            votes = 'upvotes=upvotes+1'
        }
        else{
            votes = 'downvotes=downvotes+1'
        }
    }
    var sql = 'UPDATE puppies SET ' +votes+' WHERE p_name='+name+';'
    pool.query(sql, function(error, results, fields){
        res.redirect("https://user.tjhsst.edu/2022echoi/puppy")
    }) 
})


