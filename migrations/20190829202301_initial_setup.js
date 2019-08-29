
exports.up = function(knex) {
    return knex.schema
        .createTable('projects', function (table) {
            table.uuid('id').primary();
            table.text('name').notNullable();
            table.timestamp('created_on').defaultTo(knex.fn.now());
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("projects")
};
