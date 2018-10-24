'use strict';

const db = require('./database');

//   Models
const Child = require('./models/Child');
const Parent = require('./models/Parent');

//   Associations
Child.hasMany(Parent);
Parent.belongsTo(Child);

module.exports = {
  db,
  Child,
  Parent,
};
