'use strict';

const chalk = require('chalk');
const Sequelize = require('sequelize');

// createdb and name it here
const pkg = 'placeholder';

console.log(chalk.yellow('Opening database connection'));

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${pkg}`,
  {
    logging: false,
  }
);

module.exports = db;
