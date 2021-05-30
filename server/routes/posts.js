const express = require('express');
const router = express.Router();
const { Post } = require('../public/models/Post');

// Index 
router.get('/', function(req, res){
    Post.find({})
    .sort({'createdAt':-1})
    .exec(function(err, posts){
      if(err) return res.json({ success : false, err});
      // res.render('posts/index', {posts:posts});
      return res.status(200).json({
        success : true,
        posts: posts
      })
    });
  });
  
  // create
  router.post('/', function(req, res){
    console.log('router body', req.body);
    Post.create(req.body, function(err, post){
      if(err) return res.json({ success : false, err});
      // res.redirect('/posts');
      return res.status(200).json({
        success : true,
      })
    });
  });
  
  // view
  router.get('/:id', function(req, res){
    Post.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json({ success : false, err});
      return res.status(200).json({
        success : true,
        post : post,
      })
    });
  });
  
  // edit
  router.get('/:id/update', function(req, res){
    Post.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json(err);
      return res.status(200).json({
        success : true,
        post : post,
      })
    });
  });
  
  // update
  router.post('/:id', function(req, res){
    req.body.updatedAt = Date.now();
    Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
      if(err) return res.json(err);
      return res.status(200).json({
        success : true,
        post : post,
      })
    });
  });
  
  // destroy
  router.delete('/:id', function(req, res){
    Post.deleteOne({_id:req.params.id}, function(err){
      if(err) return res.json(err);
      return res.status(200).json({
        success : true,
      })
    });
  });
  
  module.exports = router;

