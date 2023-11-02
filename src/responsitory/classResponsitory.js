const connection = require("../database/mysql");

class classResponsitory {
  getClass = (req) => {
    const {
      page = 1,
      limit = 10,
      keyword = "",
      keysort = "id",
      valuesort = "ASC",
    } = req.query;
    return new Promise((d, e) => {
      connection.query(
        `SELECT * FROM (SELECT *, IFNULL((SELECT COUNT(*) 
        FROM class 
        WHERE class_name LIKE '${keyword}%' 
       ),0) as size
       FROM class  WHERE class_name like '${keyword}%' 
        ORDER BY ${keysort} ${valuesort}
         LIMIT ${limit} OFFSET ${(+page - 1) * +limit}) a left join
         (select cs.class_id,b.username,b.id as manager_id from class_student cs join 
          (select a.id, a.username, a.email, a.phone_number from account a join system_setting st on a.role_id=st.id where st.display_order=2) b
          on b.id=cs.account_id) c on a.id=c.class_id
          
       `,
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
  addClass = (req, res) => {
    const {
      class_name,
      class_code,
      description,
      status = 1,
      milestone_id,
      student,
    } = req.body;

    return new Promise((d, e) => {
      if (class_name === null || class_name === undefined) {
        e(`class_name is required`);
      }
      if (class_code === null || class_code === undefined) {
        e(`class_code is required`);
      }

      connection.query(
        `
        insert into class(class_name,class_code,description,status,milestone_id,date_create) 
            values('${class_name}','${class_code}','${description}',${status},${milestone_id},now())
           `,
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
  addStudentClass = (class_id, account_id) => {
    return new Promise((d, e) => {
      connection.query(
        `insert into class_student(account_id,class_id,status) 
        values('${account_id}','${class_id}',true)
           `,
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
  addManagerClass = (class_id, manager_id) => {
    return new Promise((d, e) => {
      connection.query(
        `insert into class_student(account_id,class_id,status) 
        values('${manager_id}','${class_id}',true)
           `,
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
  getClassById = (id_class) => {
    return new Promise((d, e) => {
      connection.query(
        `select * from class  where id=${id_class}`,
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
  getStudentByIdClass = (id_class) => {
    return new Promise((d, e) => {
      connection.query(
        `select a.* from (select a.id, a.username, a.email, a.phone_number from account a join system_setting st on a.role_id=st.id where st.display_order=0) a 
        join class_student cs on a.id=cs.account_id where cs.class_id=${id_class}`,
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
  getMileStoneByIdClass = (id_class) => {
    return new Promise((d, e) => {
      connection.query(
        `select * from class c join milestone ms on c.milestone_id=ms.id where c.id=${id_class}`,
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
  getIssueSettingByIdClass = (id_class) => {
    return new Promise((d, e) => {
      connection.query(
        `select b.*,s.description as subject_description,s.name as subject_name,s.gitlab_config as subject_gitlab_config
        from (select a.*,p.group_name,p.project_code,p.project_name,p.description as project_description
          from 
          (select issue.id as issue_id, issue.name as issue_name,issue.description as issue_description,issue.color,issue.type,issue.work_process, issue.project_id,issue.subject_id
             from class c 
             join issue_setting issue 
             on c.id=issue.class_id 
             where c.id=${id_class}) as a
             join project p on a.project_id=p.id) as b 
             join subject s on s.id=b.subject_id
             order by b.issue_id
         `,
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
  updateStatusClass = (id, resultId) => {
    return new Promise((d, e) => {
      connection.query(
        `UPDATE class set status=${resultId} where id=${id}`,
        function (err) {
          if (err) {
            e(err);
          } else {
            d();
          }
        }
      );
    });
  };
  updateClass = (req) => {
    const { id } = req.params;
    const { class_code='', class_name='', description='', milestone_id, status } =
      req.body;
    return new Promise((d, e) => {
      connection.query(
        `UPDATE class set class_code='${class_code}' , class_name='${class_name}' ,
      description='${description}',milestone_id=${milestone_id}, status=${status}  where id=${id}`,
        function (err) {
          if (err) {
            e(err);
          } else {
            d();
          }
        }
      );
    });
  };
  deleteByIdclass = (req) => {
    const { id } = req.params;

    return new Promise((d, e) => {
      connection.query(
        `DELETE FROM class_student WHERE class_id=${id}`,
        function (err) {
          if (err) {
            e(err);
          } else {
            d();
          }
        }
      );
    });
  };
  
}

module.exports = new classResponsitory();
