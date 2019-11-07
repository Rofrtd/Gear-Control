exports.up = function(knex) {
    return knex.schema
        .createTable('equipment_allocation', function (table) {
            table.uuid('project_id').notNullable();
            table.uuid('equipment_id').notNullable();

            table.foreign('project_id').references('projects.id');
            table.foreign('equipment_id').references('equipment.id')
            table.unique(['project_id', 'equipment_id'])
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('equipment-allocation')
};