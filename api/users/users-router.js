const express = require('express');
const router = express.Router();

const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware');

const User = require('./users-model')
const Post = require('../posts/posts-model');
const { restart } = require('nodemon');


router.get('/', (req, res) => {
  User.get()
    .then(response =>{
      res.status(200).json(response);
    })
    .catch(error =>{
      res.status(500).json({message: `${error}`});
    })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/', validateUser, (req, res) => {
  User.insert(req.body)
    .then(response =>{
      res.status(201).json(response);
    })
    .catch(error =>{
      res.status(500).json({message: `${error}`});
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  User.update(req.params.id, req.body)
    .then(response =>{
      res.status(200).json(response);
    })
    .catch(error =>{
      res.status(500).json({message: `${error}`});
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  User.remove(req.params.id)
    .then(response => {
      res.status(200).json(req.user)
    })
    .catch(error =>{
      res.status(500).json({message: `${error}`});
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  User.getUserPosts(req.params.id)
    .then(response =>{
      res.status(200).json(response);
    })
    .catch(error =>{
      res.status(500).json({message: `${error}`});
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  req.body.user_id = req.params.id;
  Post.insert(req.body)
  .then(response =>{
    res.status(201).json(response);
  })
    .catch(error =>{
      res.status(500).json({message: `${error}`});
    })
});

// do not forget to export the router
module.exports = router;