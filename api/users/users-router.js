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

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res) => {
  User.remove(req.params.id)
    .then(response=>{
      res.status(200).json(req.user)
    })
    .catch(error =>{
      res.status(500).json({message: `${error}`});
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id)
    .then(response =>{
      res.status(200).json(response);
    })
    .catch(error =>{
      res.status(500).json({message: `${error}`});
    })
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;