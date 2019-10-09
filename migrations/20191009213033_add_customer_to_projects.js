exports.up = function(knex) {
        return knex.schema
            .alterTable('projects', function (table) {
                table.text('customer_id').notNullable();
            })
    };
    
    exports.down = function(knex) {
        return knex.schema
            .dropTable("projects")
    };    