const subject = require('./subject');
const user = require('./user');
const issue_setting = require('./issueSetting');
const project = require('./ptoject')
function router(app){
    app.use('/subject',subject);
    app.use('/user',user);
    app.use('/issue_setting',issue_setting);
    app.use('/project',project);
}
module.exports = router;