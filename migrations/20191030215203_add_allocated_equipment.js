exports.up = function(knex) {
    return knex.schema
        .createTable('equipment-allocation', function (table) {
            table.text('project_id').notNullable();
            table.text('equipment_id').notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('equipment-allocation')
};