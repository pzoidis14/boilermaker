'use strict';

const router = require('express').Router();
const { Child } = require('../../db');

module.exports = router;

// find all children
router.get('/', async (req, res, next) => {
  try {
    const children = await Child.findAll();
    res.json(children);
  } catch (err) {
    next(err);
  }
});

// find specific child by id
router.get('/:id', async (req, res, next) => {
  try {
    const child = await Child.findById(req.params.id);
    res.json(child);
  } catch (err) {
    next(err);
  }
});

// create new child
router.post('/', async (req, res, next) => {
  try {
    const child = await Child.create(req.body);
    res.status(201).json(child);
  } catch (err) {
    next(err);
  }
});
module.exports = router;

// delete a child
router.delete('/:childId', async (req, res, next) => {
  try {
    const id = req.params.childId;
    await Child.destroy({ where: { id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// update a child
router.put('/:childId', async (req, res, next) => {
  const updates = req.body;
  const id = req.params.childId;
  try {
    const updatedChild = await Child.update(updates, {
      where: { id },
      returning: true,
      plain: true,
    });
    res.json(updatedChild);
  } catch (err) {
    next(err);
  }
});
