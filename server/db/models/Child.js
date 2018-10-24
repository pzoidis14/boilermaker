const Sequelize = require('sequelize');
const db = require('../database');

const Child = db.define('child', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Child;
