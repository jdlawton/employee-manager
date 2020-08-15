const cTable = require('console.table');

class BusinessUnit {

    constructor(table) {
        this.table = table;
    }

    view(connection) {
        const sql = `SELECT * FROM ${this.table} ORDER BY id`;
        return connection.promise().query(sql);
        /*
            .then( ([rows,fields]) => {
                console.log(rows);
            })
            .catch(console.log);
            //return "TEST";
        */
    }

    add(connection, newItem) {
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


};

module.exports = BusinessUnit;