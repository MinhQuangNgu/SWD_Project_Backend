const connection = require("../database/mysql");

class settingResponsitory{
    createNewSetting = (query,value) => {
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

    deleteSetting = (id) => {
        return new Promise((d,e) => {
            connection.query(`DELETE FROM system_setting WHERE id=${id}`, function (err) {
                if (err) {
                    e(err);
                }
                else{
                    d()
                }
            });
        })
    }

    getSetting = (id) => {
        return new Promise((d,e) => {
            connection.query(
                `SELECT * from system_setting where id=${id}`,
                function (err, setting) {
                    if (err) {
                        e(err);
                    }
                    else{
                        d(setting);
                    }
                }
            );
        })
    }

    getAllSettings = () => {
        return new Promise((d,e) => {
            connection.query(
                `SELECT * from system_setting`,
                function (err, results) {
                    if (err) {
                        e(err);
                    }
                    else{
                        d(results);
                    }
                }
            );
        })
    }

    updateSetting = (query,values) => {
        return new Promise((d,e) => {
            connection.query(query, values, function (err) {
                if (err) {
                    e(err)
                }
                else{
                    d()
                }
            });
        })
    }

    updateSettingStatus = (id,resultId) => {
        return new Promise((d,e) => {
            connection.query(`UPDATE system_setting set status=${resultId} where id=${id}`, function (err) {
                if (err) {
                    e(err)
                }
                else{
                    d()
                }
            })
        })
    }
}

module.exports = new settingResponsitory();