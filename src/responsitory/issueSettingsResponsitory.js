const connection = require("../database/mysql");

class issueResponsitory {
    deleteMultipleIssues = (id) => {
        return new Promise((d, e) => {
            connection.query(
                `Delete from issue_setting where subject_id=${id}`,
                function (err) {
                    if (err) {
                        e(err);
                    }
                    else {
                        d();
                    }
                }
            );
        })
    }

    getIssuesSettings = (id) => {
        return new Promise((d, e) => {
            connection.query(`SELECT * from issue_setting where subject_id=${id}`, function (err, issues) {
                if (err) {
                    e(err);
                }
                else {
                    d(issues);
                }
            });
        })
    }

    createMutipleIssues = (newQuery, newValue) => {
        return new Promise((d, e) => {
            connection.query(newQuery, [newValue], function (err) {
                if (err) {
                    e(err)
                }
                else {
                    d()
                }
            });
        })
    }

    getAllIssueSettings = (id) => {
        return new Promise((d, e) => {
            connection.query(`SELECT * from issue_setting where type = "LABELS"`, function (err, issues) {
                if (err) {
                    e(err);
                }
                else {
                    d(issues);
                }
            });
        })
    }

    updateIssueSetting = (id, {
        name, description, color
    }) => {
        return new Promise((d, e) => {
            connection.query(`UPDATE issue_setting set name=?,description=?,color=? where id=?`,[name,description,color,id], function (err, issues) {
                if (err) {
                    console.log(err);
                    e(err);
                }
                else {
                    d(issues);
                }
            });
        })
    }

    deleteIssueSettings = (id) => {
        return new Promise((d, e) => {
            connection.query(`DELETE from issue_setting where id=${id}`, function (err, issues) {
                if (err) {
                    e(err);
                }
                else {
                    d(issues);
                }
            });
        })
    }
}

module.exports = new issueResponsitory();