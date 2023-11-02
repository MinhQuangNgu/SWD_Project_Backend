const connection = require("../database/mysql")

class userResponsitory{
    getManager = () => {
        return new Promise((d,e) => {
            connection.query(`select * from account where role_id = 3`, function (err,results) {
                if (err) {
                    e(err)
                }
                else{
                    d(results)
                }
            })
        })
    }
    getAllStudent = () => {
        return new Promise((d, e) => {
          connection.query(
            `select a.id, a.username, a.email, a.phone_number from account a join system_setting st on a.role_id=st.id where st.display_order=0`,
            function (err, results) {
              if (err) {
                e(err);
              } else {
                d(results);
              }
            }
          );
        });
      };
      getAllManager = () => {
        return new Promise((d, e) => {
          connection.query(
            `select a.id, a.username, a.email, a.phone_number from account a join system_setting st on a.role_id=st.id where st.display_order=2`,
            function (err, results) {
              if (err) {
                e(err);
              } else {
                d(results);
              }
            }
          );
        });
      };
}

module.exports = new userResponsitory();