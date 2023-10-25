const connection = require("../database/mysql");

class statusResponsitory{
    getAllStatus = () => {
        return new Promise((resolve,reject) => {
            connection.query(
                `select * from status`,
                function (err, results) {
                    if (err) {
                        reject(err);
                    }
                    else{
                        resolve(results);
                    }
                }
            );
        })
    }
}

module.exports = new statusResponsitory();