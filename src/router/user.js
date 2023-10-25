const userService = require('../service/userService');
const router = require('express').Router();

router.get('/manager',userService.getAllManager)



module.exports = router;