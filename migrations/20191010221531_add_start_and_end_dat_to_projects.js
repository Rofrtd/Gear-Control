exports.up = function(knex) {
        return knex.schema
            .alterTable('projects', function (table) {
                table.date('start_date').notNullable()
                table.date('end_date').notNullable();
            })
    };
    
exports.down = function(knex) {
        return knex.schema
            .alterTable('projects', function (table) {
                table.dropColumn('start_date');
                table.dropColumn('end_date');
            })
    };  
