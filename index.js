const mysql = require('mysql2');
const cTable = require('console.table');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'N5D$T*8CmnhK',
  database: 'personnelDB'
});

viewDepartments = () => {
    connection.promise().query("SELECT * FROM department ORDER BY id")
        .then( ([rows,fields]) => {
            console.table(rows);
        })
        .catch(console.log)
};

viewRoles = () => {
    const sql = `SELECT role.id, role.title, role.salary, department.name AS dept_name FROM role 
                 INNER JOIN department ON role.department_id = department.id 
                 ORDER BY role.id`;
    connection.promise().query(sql)
        .then( ([rows,fields]) => {
            console.table(rows);
        })
        .catch(console.log)
};


viewEmployees = () => {
    const sql = `SELECT emp.id, emp.first_name, emp.last_name, role.title AS role, CONCAT(mgr.first_name,' ', mgr.last_name) AS manager FROM employee emp
                 LEFT JOIN role ON emp.role_id = role.id
                 LEFT JOIN employee mgr ON emp.manager_id = mgr.id
                 ORDER BY emp.id`;
    connection.promise().query(sql)
        .then( ([rows,fields]) => {
            console.table(rows);
        })
        .catch(console.log)
};

addDepartment = (newDept) => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [newDept];
    connection.promise().query(sql,params)
        .then( ([rows,fields]) => {
            console.log(`Added ${rows.affectedRows} department!`);
        })
        .catch(console.log)
};

addRole = (newRole) => {
    const sql = `INSERT INTO role SET ?`;
    const params = newRole;
    connection.promise().query(sql,params)
        .then( ([rows,fields]) => {
            console.log(`Added ${rows.affectedRows} role!`);
        })
        .catch(console.log)
};

addEmployee = (newEmployee) => {
    const sql = `INSERT INTO employee set ?`;
    const params = newEmployee;
    connection.promise().query(sql,params)
        .then( ([rows,fields]) => {
            console.log(`Added ${rows.affectedRows} employee!`);
        })
        .catch(console.log)
};

updateEmployeeRole = (updatedEmployee) => {
    const sql = `UPDATE employee SET ? WHERE ?`;
    const params = updatedEmployee;
    connection.promise().query(sql,params)
        .then( ([rows,fields]) => {
            console.log(`Updated ${rows.affectedRows} employee!`);
        })
        .catch(console.log)
};

endConnection = () => {
    connection.end();
    return;
};

//testing
const newRole = {
    title: 'accounting manager',
    salary: 65454,
    department_id: 5
};

const newEmployee = {
    first_name: 'Ted',
    last_name: 'Gunderson',
    role_id: 1,
    manager_id: 3
};

const updatedEmployee = [{role_id:6},{id:7}];

//viewDepartments();
//viewRoles();
//viewEmployees();
addDepartment('operations');
//viewDepartments();
addRole(newRole);
//viewRoles();
addEmployee(newEmployee);
viewEmployees();
updateEmployeeRole(updatedEmployee);
viewEmployees();

endConnection();

