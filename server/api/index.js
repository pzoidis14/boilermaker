'use strict';

const router = require('express').Router();

router.use('/child', require('./routes/Child'));
router.use('/parent', require('./routes/Parent'));
router.use('/user', require('./routes/User'));

router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
