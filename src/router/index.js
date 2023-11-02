const subject = require('./subject');
const user = require('./user');
const issue_setting = require('./issueSetting');
const project = require('./ptoject')
const milestone = require("./milestone");
const classes = require("./class");
function router(app){
    app.use('/subject',subject);
    app.use('/user',user);
    app.use('/issue_setting',issue_setting);
    app.use('/project',project);
    app.use("/classes", classes);
    app.use("/milestone", milestone);
}
module.exports = router;