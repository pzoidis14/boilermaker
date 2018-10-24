'use strict';

const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../../db');

module.exports = router;

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google Client ID / Secret not found. Skipping Google OAuth.');
} else {
  // collect our google configuration into an object
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  };
  // configure the strategy with our config object, and write the function that passport will invoke after google sends
  // use the user's profile and access token
  const strategy = new GoogleStrategy(googleConfig, function(
    token,
    refreshToken,
    profile,
    done
  ) {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;

    User.findOne({ where: { googleId: googleId } })
      .then(function(user) {
        if (!user) {
          return User.create({ name, email, googleId }).then(function(user) {
            done(null, user);
          });
        } else {
          done(null, user);
        }
      })
      .catch(done);
  });
  // register our strategy with passport
  passport.use(strategy);

  // get request for 'log in with Google' from front-end
  router.get('/', passport.authenticate('google', { scope: 'email' }));

  // get request to handle response from google at the callback app provided
  router.get(
    '/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login',
    })
  );
}
