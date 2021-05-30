const express = require('express');
const router = express.Router();
const { Bucket } = require('../public/models/Bucket');

router.post('/', function(req, res) {
    Bucket.create(req.body, function(err){
        if(err) return res.json({ success : false, err});
        return res.status(200).json({
          success : true,
        })
    })
})

router.post('/list', function(req, res) {
    Bucket.find({userId : req.body.userId})
    .sort({'approved_at': -1})
    .exec(function(err, items){
        if(err) return res.json({ success : false, err});
        return res.status(200).json({
          success : true,
          items: items,
        })
    });
})

module.exports = router;