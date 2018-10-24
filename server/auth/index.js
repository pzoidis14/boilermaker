'use strict';

const router = require('express').Router();

router.use('/google', require('./routes/google'));

router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
