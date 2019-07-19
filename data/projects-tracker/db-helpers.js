const knex = require('knex');
const db = knex(require('../../knexfile').development);

module.exports = {
    getProjects,
    getProjectById,
    getActionsById,
}

function getProjects() {
    return db('projects');
}

function getProjectById(id) {
    return db('projects').where({ id }).first();
}

function getActionsById(id) {
    return db
        .select('actions.id', 'actions.task', 'actions.notes', 'actions.action_complete')
        .from('actions')
        .where({ 'project_id': id });
}