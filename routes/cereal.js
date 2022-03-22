const express = require('express');
var assert = require('assert');
const { nextTick } = require('process');
var app = express.Router();

const https = require('https');

module.exports = app

app.get('/cereal', function(req, res) {
    return res.render('cereal_template')
})

