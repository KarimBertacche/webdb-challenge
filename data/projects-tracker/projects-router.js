const express = require('express');
const db = require('./db-helpers');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await db.getProjects();

        res.status(200).json(projects);
    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving projects'
        });
    }
});

router.get('/:id', validateId, async (req, res) => {
    res.status(200).json(req.projectActions); 
});

router.post('/', async (req, res) => {
    try {
        const newProject = req.body;
        const project = await db.insertProject(newProject);

        res.status(201).json(project);
    } catch(error) {
        res.status(500).json({
            message: 'Server error while creating project'
        });
    }
});

router.post('/:id/actions', validateId, async (req, res) => {
    try {
        const { id } = req.params
        const newAction = { ...req.body, project_id: id };
        const action = await db.insertAction(newAction);

        res.status(201).json(action);
    } catch(error) {
        res.status(500).json({
            message: 'Server error while creating action'
        });
    }
});

router.delete('/:id', validateId, async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await db.removeProject(id);
            
        res.status(204).end();
    } catch(error) {
        res.status(500).json({
            message: 'Server error while deleting the project'
        });
    }
});

router.delete('/:id/actions/:actionId', validateId, async (req, res) => {
    try {
        const { id } = req.params;
        const { actionId } = req.params;
        const deletedAction = await db.removeAction(id, actionId);

        res.status(204).end();
    } catch(error) {
        res.status(500).json({
            message: 'Server error while deleting the action'
        });
    }
});

router.put('/:id', validateId, async (req, res) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const updated = await db.updateProject(id, changes);
        const updatedProject = await db.getProjectById(id);

        res.status(200).json(updatedProject);

    } catch(error) {
        res.status(500).json({
            message: 'Server error while updating project'
        });
    }
});

router.put('/:id/actions/:actionId', async (req, res) => {
    try {
        const { id, actionId } = req.params;
        const changes = req.body;
        const updated = await db.updateAction(id, actionId, changes);
        const updatedAction = await db.getActionById(actionId);

        res.status(200).json(updatedAction);
    } catch(error) {
        res.status(500).json({
            message: 'Server error while updating the action'
        });
    }
});

async function validateId(req, res, next) {
    try {
        const { id } = req.params;

        if(!isNaN(parseInt(id))) {
            const project = await db.getProjectById(id);

            if(project) {
                const actions = await db.getActionsById(id);
    
                const projectActions = {
                    'id': id,
                    ...project,
                    'actions': actions
                }
    
                req.projectActions = projectActions
    
                next();

            } else {
                res.status(404).json({
                    message: 'Project id not found'
                });
            }
        } else {
            res.status(404).json({
                message: 'Id given is not a valid number'
            });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving project by id'
        });
    } 
}

module.exports = router;