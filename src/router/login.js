const loginService = require('../service/loginService');

const router = require('express').Router();

router.post('/create',loginService.createNewAccount)
router.get('/:id',loginService.getAccount)



module.exports = router;