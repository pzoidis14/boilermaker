'use strict';

const db = require('./database');

//   Models
const Child = require('./models/Child');
const Parent = require('./models/Parent');
const User = require('./models/User');

//   Associations
Child.hasMany(Parent);
Parent.belongsTo(Child);

module.exports = {
  db,
  Child,
  Parent,
  User,
};
