const BusinessUnit = require('./Unit')

class Role extends BusinessUnit {
    constructor(table){
        super(table);
    }

    view(connection) {
        const sql = `SELECT role.id, role.title, role.salary, department.name AS dept_name FROM role 
                 INNER JOIN department ON role.department_id = department.id 
                 ORDER BY role.id`;
        return connection.promise().query(sql);
        /*
            .then( ([rows,fields]) => {
                console.table(rows);
            })
            .catch(console.log);*/
    }

    add(connection, newItem) {
        console.log("Checking input");
        console.log(newItem);
        const sql = `INSERT INTO ${this.table} SET ?`;
        const params = newItem;
        return connection.promise().query(sql,params);
        /*
            .then( ([rows,fields]) => {
                console.log(`Added ${rows.affectedRows} row!`);
            })
            .catch(console.log)
        */    
    }

    lookupId(connection, title) {
        const sql = `SELECT id FROM role WHERE title = ?`;
        const params = title;
        return connection.promise().query(sql, params);
    }

}

module.exports = Role;