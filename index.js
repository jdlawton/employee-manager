const mysql = require('mysql2');
const cTable = require('console.table');
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');
//const displayMenu = require('./lib/prompts');
const inquirer = require('inquirer');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'N5D$T*8CmnhK',
    database: 'personnelDB'
  });

  endConnection = () => {
    connection.end();
    return;
};

const dept = new Department("department");
const role = new Role("role");
const employee = new Employee("employee");



const displayMenu = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'Add a new department',
                'Delete a department',
                "View a department's utilized budget",
                'View all company roles',
                'Add a new role',
                'Delete a role',
                'View all employees',
                'Add a new employee',
                "Update an employee's role",
                "Update an employee's manager",
                'View employees by department',
                'View employees by manager',
                'Delete an employee',
                'Quit Employee Manager'
            ]
        }
    ).then(menuChoice => {
        //console.log(menuChoice);
        if (menuChoice.choice === 'View all departments'){
            dept.view(connection).then(deptData => {console.table(deptData[0])}).then(() => {displayMenu()});
        }
        else if (menuChoice.choice === 'Add a new department'){
            inquirer.prompt(
                {
                    type: 'input',
                    name: 'name',
                    message: 'Please enter the name of the new department:'
                }
            ).then(newDept => {
                newDept.name = newDept.name.toLowerCase();
                console.log(newDept);
                dept.add(connection, newDept).then(() => {console.log(`Added ${newDept.name} department!`)}).then(() => {displayMenu()});
            });

        }
        else if (menuChoice.choice === 'View all company roles'){
            role.view(connection).then(roleData => {console.table(roleData[0])}).then(() => {displayMenu()});
        }
        else if (menuChoice.choice === 'Add a new role'){
            //role.add(connection, {title: 'accounting manager', salary: 65454, department_id: 5}).then(() => {console.log(`Role added!`)}).then(() => {displayMenu()});
            let deptList = [];
            dept.view(connection).then(deptData => {deptData[0].forEach(element => deptList.push(element.name))});
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Please enter the title of the new role:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: "Please enter the role's starting salary:"
                },
                {
                    type: 'list',
                    name: 'department_id',
                    messsage: 'Please select the department this role belongs to:',
                    choices: deptList
                }
            ]).then(newRole => {
                dept.lookupId(connection, newRole.department_id)
                    .then(deptId => {
                        newRole.department_id = deptId[0][0].id;
                        //console.log(newRole);
                        return newRole;
                    }).then(newRole => {
                        console.log(newRole);
                        role.add(connection, newRole).then(() => {console.log(`Role added!`)}).then(() => {displayMenu()});
                    });
            });
        }

        else if (menuChoice.choice === 'View all employees'){
            employee.view(connection).then(employeeData => {console.table(employeeData[0])}).then(() => {displayMenu()});
        }
        else if (menuChoice.choice === 'Add a new employee'){
            employee.add(connection, {first_name: 'Ted', last_name: 'Gunderson', role_id: 1, manager_id: 3}).then(() => {console.log(`Employee added!`)}).then(() => {displayMenu()});
        }
        else if (menuChoice.choice === "Update an employee's role"){
            let newRoleId = {role_id:2};
            let empId = {id:7};
            employee.updateRole(connection, newRoleId, empId).then(() => {console.log(`Employee updated!`)}).then(() => {displayMenu()});
        }
    });
}


//dept.view(connection);

displayMenu();


//dept.add(connection, {name: "facilities"});
//dept.view(connection);
/*
role.add(connection, newRole);
role.view(connection);
employee.add(connection, newEmployee);
employee.view(connection);
employee.updateRole(connection, newEmpRole, updatedEmpId);
employee.view(connection);
*/


/*
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
*/

//endConnection();

