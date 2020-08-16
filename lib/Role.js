const BusinessUnit = require('./Unit')

class Role extends BusinessUnit {
    constructor(table){
        super(table);
    }

    //overloaded view method so I can JOIN with the department table as well
    view(connection) {
        const sql = `SELECT role.id, role.title, role.salary, department.name AS dept_name FROM role 
                 INNER JOIN department ON role.department_id = department.id 
                 ORDER BY role.id`;
        return connection.promise().query(sql).catch(console.log); 
    }

    //look up the ID of a role when you have the role title
    lookupId(connection, title) {
        const sql = `SELECT id FROM role WHERE title = ?`;
        const params = title;
        return connection.promise().query(sql, params).catch(console.log); 
    }

}

module.exports = Role;