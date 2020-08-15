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

}

module.exports = Department;