const userService = require('../service/userService');
const router = require('express').Router();

router.get('/manager',userService.getAllManager)
router.get("/student", userService.getAllStudent);
router.get('/manager_dp',userService.getAllManagerDisplay)



module.exports = router;