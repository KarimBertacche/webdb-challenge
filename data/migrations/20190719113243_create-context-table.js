
exports.up = function(knex) {
    return knex.schema
        .createTable('contexts', table => {
            table.increments();
            table.text('context_type', 128).notNullable();
            table.integer('action_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('actions');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('contexts');
};
