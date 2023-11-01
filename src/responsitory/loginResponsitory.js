const connection = require("../database/mysql");

class loginResponsitory{
    createNewAccount = (query,value) => {
        return new Promise((done,error) => {
            connection.query(
                query,
                value,
                function (err, results) {
                    if (err) {
                        error(err);
                    }
                    else{
                        done(results);
                    }
                    
                }
            );
        })
    }

    getAccount = (email, password) => {
        return new Promise((d,e) => {
            connection.query(
                `SELECT * from account where email=${email} and password=${password}`,
                function (err, account) {
                    if (err) {
                        e(err);
                    }
                    else{
                        d(account);
                    }
                }
            );
        })
    }

}

module.exports = new loginResponsitory();