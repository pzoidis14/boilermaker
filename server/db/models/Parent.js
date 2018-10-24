const Sequelize = require('sequelize');
const db = require('../database');

const Parent = db.define('parent', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Parent;
