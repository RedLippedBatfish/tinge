const { User, Palette } = require('../models/User');
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
              res.locals.palettes = docs[0].palettes;
              res.locals.tokenData = {
                _id: docs[0]._id,
                username: docs[0].username,
                palettes: docs[0].palettes,
              }
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
    console.log("req body colors", req.body.colors);
    User.findById(res.locals.tokenData._id, (err, doc) => {
      if (err) {
        console.err(err);
      }
      const newPalette = new Palette( {
        name: req.body.name,
        colors: req.body.colors,
      })
      doc.palettes.push(newPalette);
      doc.save((err, user) => {
        if (err) {
          console.error('Error in UserController.savePalette', err);
          res.send(err);
        }
        res.locals.palettes = user.palettes;
        res.locals.newTokenData = {
          _id: res.locals.tokenData._id,
          username: res.locals.tokenData.username,
          palettes: user.palettes,
        };
        next();
      })
    })
  },

 
  // Middleware for deleting palette by palette ID
  deletePalette(req, res, next) {
    // need to figure out which element of palettes array wants to be deleted
    // get user from token and get doc back
    // grab doc.palettes like above and use filter method to get array element to be deleted

    User.findById(res.locals.tokenData._id, (err, doc) => {
      if (err) {
        console.err(err);
      }
      let filteredArray = doc.palettes.filter(el => {
        console.log("el._id", el._id, "req.params.palette_id", req.params.palette_id);
        return JSON.stringify(el._id) !== JSON.stringify(req.params.palette_id);
      });
      doc.palettes = filteredArray;
      doc.save((err, user) => {
        if(err) {
          console.error('Error in UserController.deletePalette', err);
          res.send(err);
        }
        res.locals.palettes = user.palettes;
        res.locals.newTokenData = {
          _id: res.locals.tokenData._id,
          username: res.locals.tokenData.username,
          palettes: user.palettes,
        };
        next();
      })
    })

  }
};

module.exports = UsersController;
