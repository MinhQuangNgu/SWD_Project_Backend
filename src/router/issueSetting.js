const issueSettingService = require('../service/issueSettingService');

const router = require('express').Router();

router.put('/:id',issueSettingService.updateIssueSetting)
router.delete('/:id',issueSettingService.deleteIssueSettings)
router.get('/',issueSettingService.getAllIssueSetting)




module.exports = router;