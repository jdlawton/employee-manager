const BusinessUnit = require('./Unit')

class Department extends BusinessUnit {
    constructor(table){
        super(table);
    }

    //this function is used to fine a single record matching a department name, it is used when we have a dept name and
    //need to find the corresponding id number.
    lookupId(connection, name) {
        const sql = `SELECT id FROM department WHERE name = ?`;
        const params = name;
        return connection.promise().query(sql, params).catch(console.log); 
    }

    //this function returns the utilized budget for each department
    utilizedBudget(connection){
        const sql = `SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM department
                     LEFT JOIN role ON department.id = role.department_id
                     LEFT JOIN employee ON role.id = employee.role_id
                     GROUP BY department.name;`;
        return connection.promise().query(sql).catch(console.log); 
    }
}

module.exports = Department;