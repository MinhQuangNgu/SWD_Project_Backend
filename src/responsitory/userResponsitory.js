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
}

module.exports = new userResponsitory();