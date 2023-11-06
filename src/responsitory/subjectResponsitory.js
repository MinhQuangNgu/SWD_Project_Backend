const connection = require("../dbconfig/mysql");

class subjectResponsitory{
    createNewSubject = (query,value) => {
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
                    // const insertId = results.insertId;
                    // const newQuery = 'insert into issue (title,description,type_id,subject_id,status_id) values ?';
                    // let newValue = [];
                    // if (issues) {
                    //     issues?.forEach(item => {
                    //         const newItem = [item?.title, item?.description, item?.label, insertId, item?.status?.id];
                    //         newValue.push(newItem);
                    //     });
                    // }
                    // connection.query(newQuery, [newValue], function (err) {
                    //     if (err) {
                    //         return res.status(400).json({ message: err.toString() });
                    //     }
                    //     return res.status(200).json({ message: "Created subject successfully!" });
                    // });
                    
                }
            );
        })
    }

    deleteSubject = (id) => {
        return new Promise((d,e) => {
            connection.query(`DELETE FROM subject WHERE id=${id}`, function (err) {
                if (err) {
                    e(err);
                }
                else{
                    d()
                }
            });
        })
    }

    getSubject = (queryString) => {
        return new Promise((d,e) => {
            connection.query(
                queryString,
                function (err, subject) {
                    if (err) {
                        e(err);
                    }
                    else{
                        d(subject);
                    }
                }
            );
        })
    }

    getAllSubjects = (queryString) => {
        return new Promise((d,e) => {
            connection.query(
                queryString,
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

    updateSubject = (query,values) => {
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

    updateSubjectStatus = (id,resultId) => {
        return new Promise((d,e) => {
            connection.query(`UPDATE subject set status=${resultId} where id=${id}`, function (err) {
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

module.exports = new subjectResponsitory();