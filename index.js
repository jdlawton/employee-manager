const mysql = require('mysql2');
const cTable = require('console.table');
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');


const {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    endConnection
} = require('./db/queries');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'N5D$T*8CmnhK',
    database: 'personnelDB'
  });

const dept = new Department("department");
const role = new Role("role");
const employee = new Employee("employee");

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

const newEmpRole = {role_id:2};
const updatedEmpId = {id:7};

dept.add(connection, {name: "facilities"});
dept.view(connection);
role.add(connection, newRole);
role.view(connection);
employee.add(connection, newEmployee);
employee.view(connection);
employee.updateRole(connection, newEmpRole, updatedEmpId);
employee.view(connection);



/*
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

viewDepartments();
viewRoles();
viewEmployees();
//addDepartment('operations');
//viewDepartments();
//addRole(newRole);
//viewRoles();
//addEmployee(newEmployee);
//viewEmployees();
//updateEmployeeRole(updatedEmployee);
//viewEmployees();
*/
endConnection(connection);

