const settingService = require('../service/settingService');

const router = require('express').Router();

router.post('/create',settingService.createNewSetting)
router.post('/c_status/:id',settingService.changeStatusSetting)
router.get('/:id',settingService.getSetting)
router.delete('/:id',settingService.deleteSetting)
router.put('/:id',settingService.updateSetting)
router.get('/',settingService.getAllSettings)



module.exports = router;