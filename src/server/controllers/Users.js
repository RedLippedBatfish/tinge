const User = require('../models/User');
const bcrypt = require('bcryptjs');

const UsersController = {
  // Middleware for signup
  createUser(req, res, next) {
    if (req.body.username && req.body.password) {
      const newUser = new User({
        username: req.body.username,
        password_digest: req.body.password
      });
      newUser.save((err, user) => {
        if (err) {
          console.error('Error in UsersController.createUser:', err);
          res.send(err);
        }
        res.locals.tokenData = {
          _id: user._id,
          username: user.username,
          palettes: []
        };
        next();
      });
    } else {
      res.status(400);
      res.send('No username or password.');
    }
  },
  // Middlware for login
  login(req, res, next) {},
  // Middleware for creating new palette
  createPalette(req, res, next) {},
  // Middleware for deleting palette by palette ID
  deletePalette(req, res, next) {}
};

module.exports = UsersController;
