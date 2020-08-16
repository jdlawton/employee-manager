const BusinessUnit = require('./Unit')

class Department extends BusinessUnit {
    constructor(table){
        super(table);
    }

    lookupId(connection, name) {
        const sql = `SELECT id FROM department WHERE name = ?`;
        const params = name;
        return connection.promise().query(sql, params);
    }

    utilizedBudget(connection){
        const sql = `SELECT dep.id, dep.name, SUM(role.salary) AS utilized_budget FROM department dep
                     LEFT JOIN role ON dep.id = role.department_id
                     GROUP BY dep.name;`;
        return connection.promise().query(sql);
    }
}

module.exports = Department;