exports.up = async function (knex) {
    return knex.schema
        .createTable('address', (table) => {
            table.increments('id').primary();
            table.string('city').notNullable();
            table.string('state').notNullable();
            table.string('street').notNullable();
            table.integer('number').notNullable();
            table.integer('value').notNullable();
            table.integer('ownerId').unsigned().references('id').inTable('user').onDelete('CASCADE');
            table.timestamps(true, true);
        });
};

exports.down = async function (knex) {
    return knex.schema.dropTableIfExists('address')
};