const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const passport = require('passport');

const User = require('../models/user');

exports.get = (req, res, next) => {
  res.render('login', {
    title: 'Login',
  });
};

exports.post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
});

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
