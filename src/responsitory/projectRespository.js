const connection = require("../database/mysql");

class projectRepository {
    createNewProject = (query, value) => {
        return new Promise((done, error) => {
            connection.query(
                query,
                value,
                function (err, results) {
                    if (err) {
                        error(err);
                    }
                    else {
                        done(results);
                    }

                }
            );
        })
    }

    setStatusProject = (id) => {
        return new Promise((d, e) => {
            connection.query(`
            UPDATE project
            SET status_id = CASE
                WHEN status_id = 1 THEN 0
                WHEN status_id = 0 THEN 1
                ELSE status_id
            END
            WHERE id = ${id};`, function (err) {
                if (err) {
                    e(err);
                }
                else {
                    d()
                }
            });
        })
    }

    getProject = (id) => {
        return new Promise((d, e) => {
            connection.query(
                `SELECT
                p.*,
                m.name AS "mileStone_name",
                m.start_date,
                m.end_date,
                a1.username AS "manager_username",
                a2.username AS "team_leader_username",
                c.class_name
            FROM project p
            LEFT JOIN milestone m ON p.milestone_id = m.id
            LEFT JOIN account a1 ON p.manager_id = a1.id
            LEFT JOIN account a2 ON p.team_leader_id = a2.id
            LEFT JOIN class c ON p.class_id = c.id 
            where p.id=${id}`,
                function (err, result) {
                    if (err) {
                        e(err);
                    }
                    else {
                        d(result);
                    }
                }
            );
        })
    }

    getAllProject = () => {
        return new Promise((d, e) => {
            connection.query(
                `SELECT
                p.*,
                m.name AS "mileStone_name",
                m.start_date,
                m.end_date,
                a1.username AS "manager_username",
                a2.username AS "team_leader_username",
                c.class_name
            FROM project p
            LEFT JOIN milestone m ON p.milestone_id = m.id
            LEFT JOIN account a1 ON p.manager_id = a1.id
            LEFT JOIN account a2 ON p.team_leader_id = a2.id
            LEFT JOIN class c ON p.class_id = c.id;`,
                function (err, result) {
                    if (err) {
                        e(err);
                    }
                    else {
                        d(result);
                    }
                }
            );
        })
    }
    getAllClass = () => {
        return new Promise((d, e) => {
            connection.query(
                `SELECT * FROM class;`,
                function (err, result) {
                    if (err) {
                        e(err);
                    }
                    else {
                        d(result);
                    }
                }
            );
        })
    }
    getAllTeacher = () => {
        return new Promise((d, e) => {
            connection.query(
                `SELECT
                a.*,
                ss.role
                FROM account a
                LEFT JOIN system_setting ss ON a.role_id = ss.id
                where ss.role = 'teacher'`,
                function (err, result) {
                    if (err) {
                        e(err);
                    }
                    else {
                        d(result);
                    }
                }
            );
        })
    }
    getAllManager = () => {
        return new Promise((d, e) => {
            connection.query(
                `SELECT
                a.*,
                ss.role
                FROM account a
                LEFT JOIN system_setting ss ON a.role_id = ss.id
                where ss.role = 'manager'`,
                function (err, result) {
                    if (err) {
                        e(err);
                    }
                    else {
                        d(result);
                    }
                }
            );
        })
    }
    getAllStudent= () => {
        return new Promise((d, e) => {
            connection.query(
                `SELECT
                a.*,
                ss.role
                FROM account a
                LEFT JOIN system_setting ss ON a.role_id = ss.id
                where ss.role = 'student'`,
                function (err, result) {
                    if (err) {
                        e(err);
                    }
                    else {
                        d(result);
                    }
                }
            );
        })
    }
    updateProject = (query, values) => {
        return new Promise((d, e) => {
            connection.query(query, values, function (err) {
                if (err) {
                    e(err)
                }
                else {
                    d()
                }
            });
        })
    }

}

module.exports = new projectRepository();