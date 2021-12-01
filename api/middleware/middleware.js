const User = require('../users/users-model')
const Post = require('../posts/posts-model')

function logger(req, res, next) {
  // DO YOUR MAGIC!!!
  console.log("LOGGER: ", req.method, req.url, Date.now());
  next();
}

function validateUserId(req, res, next) {
  // check db for id
  //if valid, add to req.user
  //if not, 404
  User.getById(req.params.id)
    .then(response => {
      req.user = response;
      next();
    })
    .catch(err => {
      res.status(404).json({ message: "user not found" })
    })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
 module.exports = {
   logger,
   validateUserId,
   validateUser,
   validatePost,
 };