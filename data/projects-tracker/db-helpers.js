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
    updateAction,
    getActionContext
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

function getActionContext(id, actionId) {
    return db
        .select('context_type AS context', 'task', 'notes', 'project_name AS project', 'description')
        .from('contexts AS c')
        .innerJoin('actions AS a', 'c.action_id', 'a.id')
        .innerJoin('projects AS p', 'a.project_id', 'p.id')
        .where({ 'a.id': actionId, 'project_id': id });
}

// SELECT
//     context_type AS context,
//     task,
//     notes,
//     project_name,
//     description
// FROM contexts AS c
// JOIN actions AS a
// ON c.action_id = a.id
// JOIN projects AS p
// ON a.project_id = p.id