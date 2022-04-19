const express = require('express');
const router = express.Router()

// built in module for working with files
const fs = require('fs')

// built in module for working with paths
const path = require('path')


var all_words = fs.readFileSync(path.join('/site','public','data','enable.txt')).toString().split('\n')


router.get('/enable',function(req,res){
    
    var indx;
    if ('word' in req.query) {
        indx = req.query.word;
    } else {
        indx = 0;
    }
    
    var params = {
        'word' : all_words[indx],
        'indx' : indx
    }

    res.json(params)
})


module.exports = router;