exports.up = async function (knex) {
    return knex.schema
        .createTable('user', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            table.timestamps(true, true);
        });
};

exports.down = async function (knex) {
    return knex.schema.dropTableIfExists('user')
};