const subjectService = require('../service/subjectService');
const router = require('express').Router();

router.post('/create',subjectService.createNewSubject)
router.post('/c_status/:id',subjectService.changeStatusSubject)
router.get('/:id',subjectService.getSubject)
router.delete('/:id',subjectService.deleteSubject)
router.put('/:id',subjectService.updateSubject)
router.get('/',subjectService.getAllSubject)



module.exports = router;