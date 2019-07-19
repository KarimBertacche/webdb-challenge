const knex = require('knex');
const db = knex(require('../../knexfile').development);

module.exports = {
    getProjects,
    getProjectById,
    getActionsById,
    insertProject,
    insertAction,
    removeProject
}

function getProjects() {
    return db('projects');
}

function getProjectById(id) {
    return db('projects').where({ id }).first();
}

function getActionById(id) {
    return db('actions').where({ id }).first();
}

function getActionsById(id) {
    return db
        .select('actions.id', 'actions.task', 'actions.notes', 'actions.action_complete')
        .from('actions')
        .where({ 'project_id': id });
}

function insertProject(project) {
    return db('projects').insert(project)
        .then(id => {
            return getProjectById(id[0]);
        });
}

function insertAction(action) {
    return db('actions').insert(action)
        .then(id => {
            return getActionById(id[0]);
        });
}

function removeProject(id) {
    return db('projects').where({ id }).del();
}