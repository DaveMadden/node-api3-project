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
      if (!response){
        res.status(404).json({ message: "user not found" })
      }
      else{
        req.user = response;
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ message: `${err}`})
    })
}

function validateUser(req, res, next) {
  if (!req.body.name){
    res.status(400).json({ message: "missing required name field" });
  }
  else(
    next()
  )
}

function validatePost(req, res, next) {
  if(!req.body.text){
    res.status(400).json({ message: "missing required text field" })
  }
  else(
    next()
  )
}

// do not forget to expose these functions to other modules
 module.exports = {
   logger,
   validateUserId,
   validateUser,
   validatePost,
 };