class BusinessUnit {

    constructor(table) {
        this.table = table;
    }

    view(connection) {
        const sql = `SELECT * FROM ${this.table} ORDER BY id`;
        connection.promise().query(sql)
            .then( ([rows,fields]) => {
                console.table(rows);
            })
            .catch(console.log);
    }

    add(connection, newItem) {
        const sql = `INSERT INTO ${this.table} SET ?`;
        const params = newItem;
        connection.promise().query(sql,params)
            .then( ([rows,fields]) => {
                console.log(`Added ${rows.affectedRows} row!`);
            })
            .catch(console.log)
    }
};

module.exports = BusinessUnit;