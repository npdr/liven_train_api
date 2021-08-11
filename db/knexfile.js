require('dotenv').config({path: '../.env'});

const {
    knexSnakeCaseMappers
  } = require('objection');
  
  module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        database: 'user_liven',
        user: 'root',
        password: process.env.DB_SECRET,
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      },
      seeds: {
        directory: './seeds',
      },
      ...knexSnakeCaseMappers,
    },
  };