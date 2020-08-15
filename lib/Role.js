const BusinessUnit = require('./Unit')

class Role extends BusinessUnit {
    constructor(table){
        super(table);
    }

    view(connection) {
        const sql = `SELECT role.id, role.title, role.salary, department.name AS dept_name FROM role 
                 INNER JOIN department ON role.department_id = department.id 
                 ORDER BY role.id`;
        connection.promise().query(sql)
            .then( ([rows,fields]) => {
                console.table(rows);
            })
            .catch(console.log);
    }

}

module.exports = Role;