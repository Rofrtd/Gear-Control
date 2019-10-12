exports.up = function(knex) {
    return knex.schema
        .createTable('equipment', function (table) {
            table.uuid('id').primary();
            table.text('type').notNullable();
            table.text('model').notNullable();
            table.text('serial_number').notNullable();
            table.text('internal_id').notNullable();
            table.date('last_calibration').notNullable();
            table.text('calibration_period').notNullable();
            table.text('notification')
            table.timestamp('created_on').defaultTo(knex.fn.now());
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("equipment")
};