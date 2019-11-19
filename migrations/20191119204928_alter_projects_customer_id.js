exports.up = function(knex) {
    return knex.schema.raw(`
    ALTER TABLE projects ALTER COLUMN customer_id TYPE uuid USING customer_id::uuid;
    ALTER TABLE projects ADD CONSTRAINT projects_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES customers(id);
    `)
};
    
exports.down = function(knex) {
    return knex.schema.raw(`
    ALTER TABLE projects DROP CONSTRAINT projects_customer_id_foreign;
    ALTER TABLE projects ALTER COLUMN customer_id TYPE text USING customer_id::text;
    `)
};    