'use strict';

const router = require('express').Router();

router.use('/Child', require('./routes/Child'));
router.use('/Parent', require('./routes/Parent'));

router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
