'use strict';

const router = require('express').Router();
const { Child, Parent } = require('../db');

module.exports = router;

// find all parents
router.get('/', async (req, res, next) => {
  try {
    const parents = await Parent.findAll();
    res.json(parents);
  } catch (err) {
    next(err);
  }
});

// find specific parent by id, including its children
router.get('/:id', async (req, res, next) => {
  try {
    const parent = await Parent.findById(req.params.id, {
      include: {
        model: Child,
      },
    });
    res.json(parent.dataValues);
  } catch (err) {
    next(err);
  }
});

// find all children of a parent with a specific Id
router.get('/:id/children', async (req, res, next) => {
  try {
    const children = await Child.findAll({
      where: { parentId: req.params.id },
    });
    res.json(children);
  } catch (err) {
    next(err);
  }
});

// create new parent
router.post('/', async (req, res, next) => {
  try {
    const parent = await Parent.create(req.body);
    res.status(201).json(parent);
  } catch (err) {
    next(err);
  }
});
module.exports = router;

// create new child for a parent
router.post('/:id/children', async (req, res, next) => {
  try {
    req.body.parentId = req.params.id;
    const child = await Child.create(req.body);
    res.status(201).json(child);
  } catch (err) {
    next(err);
  }
});

// delete a parent
router.delete('/:parentId', async (req, res, next) => {
  try {
    const id = req.params.parentId;
    await Parent.destroy({ where: { id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// update a parent
router.put('/:parentId', async (req, res, next) => {
  const updates = req.body;
  const id = req.params.parentId;
  try {
    const updatedParent = await Parent.update(updates, {
      where: { id },
      returning: true,
      plain: true,
    });
    res.json(updatedParent);
  } catch (err) {
    next(err);
  }
});
