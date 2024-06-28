const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.get = (req, res, next) => {
  res.render('sign-up', { title: 'Sign up' });
};

exports.post = [
  body('first_name')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('First name must be between 3 and 100 characters')
    .isAlpha()
    .withMessage('First name must only contain letters')
    .escape(),
  body('last_name')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Last name must be between 3 and 100 characters')
    .isAlpha()
    .withMessage('Last name must only contain letters')
    .escape(),
  body('email')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Email must be between 3 and 100 characters')
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      res.render('sign-up', {
        title: 'Sign up',
        user,
        errors: errors.array(),
      });
      return;
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      user.password = hashedPassword;
      await user.save();
      res.redirect('/');
    });
  },
];
