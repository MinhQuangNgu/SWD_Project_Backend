const projectService = require('../service/projectService')
const router = require('express').Router();

// router.put('/:id')
router.get('/', projectService.getAllProject)
router.get('/:id', projectService.getProject)
router.put('/setStatus/:id', projectService.setStatusProject)

router.put('/:id', projectService.updateProject)
router.post('/', projectService.createNewProject)
module.exports = router;