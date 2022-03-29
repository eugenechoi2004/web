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
    var sql = 'UPDATE pagevisits SET count=count+1;'
    pool.query(sql, function(error, results, fields){
        if (error) throw error;
    }) 
    var sql = 'SELECT count  FROM pagevisits;'
    pool.query(sql, function(error, results, fields){
        if (error) throw error;
        var params = {
        	'data' : results[0].count
        }
        res.render('page',params)
    }) 
 })


