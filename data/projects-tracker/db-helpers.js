const knex = require('knex');
const db = knex(require('../../knexfile').development);

module.exports = {
    getProjects,
    getProjectById,
    getActionById,
    getActionsById,
    insertProject,
    insertAction,
    removeProject,
    removeAction,
    updateProject,
    updateAction
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

function removeAction(id, actionId) {
    return db('actions').where({ 'id': actionId, 'project_id': id }).del();
}

function updateProject(id, changes) {
    return db('projects').where({ id }).update(changes);
}

function updateAction(id, actionId, changes) {
    return db('actions').where({ 'id': actionId, 'project_id': id }).update(changes);
}