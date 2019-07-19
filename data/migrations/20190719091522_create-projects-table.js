
exports.up = function(knex) {
    return knex.schema
        .createTable('projects', table => {
            table.increments();
            table.string('project_name', 128).notNullable();
            table.string('description', 128).notNullable();
            table.boolean('project_complete');
        })
        .createTable('actions', table => {
            table.increments();
            table.text('task', 128).notNullable();
            table.text('notes', 128);
            table.boolean('action_complete')
            table.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('actions')
        .dropTableIFExists('projects');
};
