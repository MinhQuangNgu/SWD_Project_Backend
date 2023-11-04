const projectService = require('../service/projectService')
const router = require('express').Router();
//get data from another table
router.get('/class', projectService.getAllClass)
router.get('/milestone', projectService.getAllMileStone)
router.get('/manager', projectService.getAllManager)
router.get('/teacher', projectService.getAllTeacher)
router.get('/student', projectService.getAllStudent)
// router.put('/:id')
router.get('/', projectService.getAllProject)
router.get('/:id', projectService.getProject)
router.put('/setStatus/:id', projectService.setStatusProject)

router.put('/:id', projectService.updateProject)
router.post('/', projectService.createNewProject)

module.exports = router;