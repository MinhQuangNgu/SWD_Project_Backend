const classService = require("../service/classService");
const router = require("express").Router();

router.get("/list", classService.getClass);
router.post("/add_class", classService.addClass);
router.post("/update_class/:id", classService.updateClass);
router.get("/:id", classService.getDetailClass);
router.post("/c_status/:id", classService.updateStatusClass);

module.exports = router;
