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

module.exports = router;