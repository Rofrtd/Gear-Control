
exports.up = function(knex) {
    return knex.schema
        .createTable('customers', function (table) {
            table.uuid('id').primary();
            table.text('name').notNullable();
            table.timestamp('created_on').defaultTo(knex.fn.now());
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("customers")
};