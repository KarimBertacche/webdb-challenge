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

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if(id) {
            const project = await db.getProjectById(id);
            const actions = await db.getActionsById(id);

            const projectActions = {
                'id': id,
                ...project,
                'actions': actions
            }

            res.status(200).json(projectActions);
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

router.post("/:id/actions", async (req, res) => {
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

module.exports = router;