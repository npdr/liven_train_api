const knex = require('knex');
const knexfile = require('./knexfile');
const { Model } = require('objection');

function dbSetup() {
    const db = knex(knexfile.development);
    Model.knex(db);
}

module.exports = dbSetup;