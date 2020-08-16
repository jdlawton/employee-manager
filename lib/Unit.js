//the business unit class is extended to the Department, Role, and Employee classes. The classes are used for organization
//and to make some of the main application's function calls more readable.

class BusinessUnit {

    //this.table is used so no matter which table we are querying, we can use the ${this.table} to save us from needing to
    //rewrite every function call.
    constructor(table) {
        this.table = table;
    }

    //view will returns all of the records in a given table ordered by their ID
    view(connection) {
        const sql = `SELECT * FROM ${this.table} ORDER BY id`;
        return connection.promise().query(sql).catch(console.log);
    
    }

    //add is used to add a new set into a table
    add(connection, newItem) {
        const sql = `INSERT INTO ${this.table} SET ?`;
        const params = newItem;
        return connection.promise().query(sql,params).catch(console.log);   
    }

    //delete is for deleting a single row from a table
    delete(connection, delId) {
        const sql = `DELETE FROM ${this.table} WHERE id = ?`;
        const params = delId;
        return connection.promise().query(sql, params).catch(console.log); 
    }
};

module.exports = BusinessUnit;