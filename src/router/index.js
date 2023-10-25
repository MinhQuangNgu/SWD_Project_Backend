const subject = require('./subject');
const user = require('./user');
const issue_setting = require('./issueSetting');
function router(app){
    app.use('/subject',subject);
    app.use('/user',user);
    app.use('/issue_setting',issue_setting);
}
module.exports = router;