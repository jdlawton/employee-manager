const BusinessUnit = require('./Unit')

class Employee extends BusinessUnit {
    constructor(table){
        super(table);
    }

    //overloaded view to allow joining
    view(connection) {
        const sql = `SELECT emp.id, emp.first_name, emp.last_name, role.title AS role, CONCAT(mgr.first_name,' ', mgr.last_name) AS manager FROM employee emp
                 LEFT JOIN role ON emp.role_id = role.id
                 LEFT JOIN employee mgr ON emp.manager_id = mgr.id
                 ORDER BY emp.id`;
        return connection.promise().query(sql).catch(console.log); 
    }

    //a view that returns all employees and sorts them according to department name and then employee id
    viewByDept(connection){
        const sql = `SELECT emp.id, emp.first_name, emp.last_name, role.title AS role, CONCAT(mgr.first_name,' ', mgr.last_name) AS manager, dept.name AS department FROM employee emp
                     LEFT JOIN role ON emp.role_id = role.id
                     LEFT JOIN employee mgr ON emp.manager_id = mgr.id
                     LEFT JOIN department dept ON role.department_id = dept.id
                     ORDER BY dept.name, emp.id;`
        return connection.promise().query(sql).catch(console.log); 
    }

    // a view that returns all employees sorted by the manager and then employee id
    viewByManager(connection){
        const sql = `SELECT emp.id, emp.first_name, emp.last_name, role.title AS role, CONCAT(mgr.first_name,' ', mgr.last_name) AS manager FROM employee emp
                     LEFT JOIN role ON emp.role_id = role.id
                     LEFT JOIN employee mgr ON emp.manager_id = mgr.id
                     ORDER BY emp.manager_id, emp.id;`;
        return connection.promise().query(sql).catch(console.log); 
    }

    //updates an employees role
    updateRole(connection, newRole, employeeId) {
        const sql = `UPDATE employee SET ? WHERE ?`;
        let params = [];
        params.push(newRole);
        params.push(employeeId);
        return connection.promise().query(sql,params).catch(console.log); 
    }

    //updates an employees manager
    updateManager(connection, newMgr, employeeId) {
        const sql = `UPDATE employee SET ? WHERE ?`;
        let params = [];
        params.push(newMgr);
        params.push(employeeId);
        return connection.promise().query(sql,params).catch(console.log); 
    }

    //selects an employee id when you know the employee name
    lookupId(connection, name) {
        const sql = `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`;
        const params = name.split(' ');
        return connection.promise().query(sql, params).catch(console.log); 
    }
}

module.exports = Employee;