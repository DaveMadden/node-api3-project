const express = require('express');
const { logger } = require('./middleware/middleware');

const server = express();

server.use(express.json());

const usersRouter = require('./users/users-router');

server.use(logger)
server.use('/api', usersRouter);

// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
