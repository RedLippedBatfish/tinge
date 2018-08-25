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
  login(req, res, next) {
    User.find(
      {
        username: req.body.username,
      }, (err, docs) => {
        if (err || docs.length === 0) {
          res.status(401);
          res.send('User not found.')
        } else {
          bcrypt.compare(req.body.password, docs[0].password_digest, function(err, result) {
            if (result) {
              res.locals._id = docs[0]._id;
              res.locals.username = docs[0].username;
              next();
            } else {
              res.status(401);
              res.send('Invalid login credentials.')
            }
          })
        }
      }
    )
  },

  // Middleware for generating new palette
  generatePalette(req, res, next) {
    // Import npm dominant color package (To be determined)

  },


  // Middleware for creating new palette
  savePalette(req, res, next) { 
    res.locals.tokenData 

    
    // update sub document when saving a palette 
    // exract palette collection and save to array 

    // 5 colors (each has RGB)
    // Each palette will have 

    // Object with 2 properties (name of palette, array of rgb object of top 5 colors
    // Assume name and colors are in body of post request 
  
  },
  // Middleware for deleting palette by palette ID
  deletePalette(req, res, next) {}
};

module.exports = UsersController;
