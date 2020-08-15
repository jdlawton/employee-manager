const BusinessUnit = require('./Unit')

class Employee extends BusinessUnit {
    constructor(table){
        super(table);
    }

    view(connection) {
        const sql = `SELECT emp.id, emp.first_name, emp.last_name, role.title AS role, CONCAT(mgr.first_name,' ', mgr.last_name) AS manager FROM employee emp
                 LEFT JOIN role ON emp.role_id = role.id
                 LEFT JOIN employee mgr ON emp.manager_id = mgr.id
                 ORDER BY emp.id`;
        return connection.promise().query(sql);
        /*
            .then( ([rows,fields]) => {
                console.log(rows);
            })
            .catch(console.log);*/
    }

    updateRole(connection, newRole, employeeId) {
        const sql = `UPDATE employee SET ? WHERE ?`;
        let params = [];
        params.push(newRole);
        params.push(employeeId);
        return connection.promise().query(sql,params);
        /*
            .then( ([rows,fields]) => {
                console.log(`Updated ${rows.affectedRows} employee!`);
            })
            .catch(console.log) */
    }

}

module.exports = Employee;