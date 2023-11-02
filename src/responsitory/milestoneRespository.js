const connection = require("../database/mysql");

class milestoneResponsitory {
  getList = () => {
    return new Promise((d, e) => {
      connection.query(`select * from milestone where status=1`, function (err, results) {
        if (err) {
          e(err);
        } else {
          d(results);
        }
      });
    });
  };
}

module.exports = new milestoneResponsitory();
