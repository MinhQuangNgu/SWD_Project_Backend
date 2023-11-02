const mileStone = require("../service/milestone");
const router = require("express").Router();

router.get("/list", mileStone.getList);

module.exports = router;
