exports.up = function(knex) {
        return knex.schema
            .alterTable('customers', function (table) {
                table.text('country').notNullable();
                table.text('state').notNullable();
                table.text('street');
                table.text('suburb').notNullable();
            })
    };
    
    exports.down = function(knex) {
        return knex.schema
            .dropTable("customers")
    };   
