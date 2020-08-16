//require statements for all of the various pieces being used throughout the application
const mysql = require('mysql2');
const cTable = require('console.table');
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');
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

//create objects that I will be using to invoke methods when making a sql call
const dept = new Department("department");
const role = new Role("role");
const employee = new Employee("employee");

//ASCII title screen
const titleScreen = () => {
    console.log(`
    ███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗
    ██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝
    █████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗  
    ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝  
    ███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗
    ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝
                                                                         
    ███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗██████╗        
    ████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝██╔══██╗       
    ██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ██████╔╝       
    ██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██╔══██╗       
    ██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║  ██║       
    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝       
                                                                         `);
}

//the main application function, displays the main menu of choices. When a choice is selected, it then performs/calls the 
//appropriate code
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
        //all of the menu choices follow
        if (menuChoice.choice === 'View all departments'){
            dept.view(connection).then(deptData => {console.table(deptData[0])}).then(() => {displayMenu()}).catch(console.log);
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
                dept.add(connection, newDept).then(() => {console.log(`Added ${newDept.name} department!`)}).then(() => {displayMenu()}).catch(console.log);
            });

        }
        //deletes a department, IF that department does not have any roles assigned to it. Because of the FOREIGN KEY with the role table, trying to delete
        //a department that has roles assigned to it will throw an error. While researching this function, I found it was possible to force the delete while 
        //ignoring the FK CONSTRAINT, but I ultimately decided that NOT allowing the delete would be more realistic behavior if this were to be an actual app
        //used in a business. If you want to delete a department that has roles, you will first need to delete those roles, then you can delete the department.
        else if (menuChoice.choice === 'Delete a department'){
            let deptList = [];
            dept.view(connection).then(deptData => {deptData[0].forEach(element => deptList.push(element.name))}).then(() => {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'name',
                        message: "Please select the department to delete:(YOU CAN ONLY DELETE A DEPT WITH NO ASSIGNED ROLES!)",
                        choices: deptList
                    }
                ]).then(deptChoice => {
                    dept.lookupId(connection, deptChoice.name).then(deptId => {
                        dept.delete(connection, deptId[0][0].id).then(() => {console.log(`Department deleted!`)}).then(() => {displayMenu()}).catch(console.log);
                    }).catch(console.log);
                });
            }).catch(console.log);

        }

        //the utilized budget calculation is all being done on the SQL side, so this just calls that method and displays the result
        else if (menuChoice.choice === "View a department's utilized budget"){
            dept.utilizedBudget(connection).then(deptData => {console.table(deptData[0])}).then(() => {displayMenu()}).catch(console.log);
        }
        else if (menuChoice.choice === 'View all company roles'){
            role.view(connection).then(roleData => {console.table(roleData[0])}).then(() => {displayMenu()}).catch(console.log);
        }
        else if (menuChoice.choice === 'Add a new role'){
            let deptList = [];
            dept.view(connection).then(deptData => {deptData[0].forEach(element => deptList.push(element.name))}).catch(console.log);
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
                newRole.title = newRole.title.toLowerCase();
                dept.lookupId(connection, newRole.department_id)
                    .then(deptId => {
                        newRole.department_id = deptId[0][0].id;
                        return newRole;
                    }).then(newRole => {
                        role.add(connection, newRole).then(() => {console.log(`Role added!`)}).then(() => {displayMenu()}).catch(console.log);
                    });
            }).catch(console.log);
        }
        //much like deleting a department, there can't be any employees assigned to a role before that role can be deleted. If you want to delete
        //a role, you will first need to assign those employees to a different role and then it can be deleted.
        else if (menuChoice.choice === 'Delete a role'){
            let roleList = [];
            role.view(connection).then(roleData => {roleData[0].forEach(element => roleList.push(element.title))}).then(() => {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'title',
                        message: "Please select the role to delete:(YOU CAN ONLY DELETE A ROLE THAT HAS NOONE ASSIGNED TO IT!)",
                        choices: roleList
                    }
                ]).then(roleChoice => {
                    role.lookupId(connection, roleChoice.title).then(roleId => {
                        role.delete(connection, roleId[0][0].id).then(() => {console.log(`Role deleted!`)}).then(() => {displayMenu()}).catch(console.log);
                    })
                })
            }).catch(console.log);

        }
        else if (menuChoice.choice === 'View all employees'){
            employee.view(connection).then(employeeData => {console.table(employeeData[0])}).then(() => {displayMenu()}).catch(console.log);
        }
        //adds a new employee to the database, when creating the list of possible managers, the app currently doesn't filter out who is eligible to be a manger
        //and who isn't, it is just a list of all employees in the company. This matches the behavior in the challenge example screenshot, so I didn't make it more
        //complicated on myself.
        else if (menuChoice.choice === 'Add a new employee'){
            let roleList = [];
            let mgrList = [];
            role.view(connection).then(roleData => {roleData[0].forEach(element => roleList.push(element.title))}).catch(console.log);
            employee.view(connection).then(mgrData => {mgrData[0].forEach(element => mgrList.push(element.first_name+' '+element.last_name))}).catch(console.log);
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "Please enter the employee's first name:"
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "Please enter the employee's last name:"
                },
                {
                    type: 'list',
                    name: 'role_id',
                    messsage: "Please select the employee's role:",
                    choices: roleList
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Please select the manager the employee will be reporting to:",
                    choices: mgrList
                }
            ]).then(newEmp => {
                role.lookupId(connection, newEmp.role_id)
                .then(roleId => {
                    newEmp.role_id = roleId[0][0].id;
                    return newEmp;
                }).then(newEmp => {
                    employee.lookupId(connection, newEmp.manager_id)
                    .then(mgrId => {
                        newEmp.manager_id = mgrId[0][0].id;
                        return newEmp;
                    }).then(newEmp => {
                        employee.add(connection, newEmp).then(() => {console.log(`Employee added!`)}).then(() => {displayMenu()}).catch(console.log);
                    });
                });
            }).catch(console.log);
        }
        else if (menuChoice.choice === "Update an employee's role"){ 
            let roleList = [];
            let empList = [];
            role.view(connection).then(roleData => {roleData[0].forEach(element => roleList.push(element.title))}).catch(console.log); 
            employee.view(connection).then(empData => {empData[0].forEach(element => empList.push(element.first_name+' '+element.last_name))}).then(() => {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'id',
                        message: "Please select the employee to update:",
                        choices: empList
                    },
                    {
                        type: 'list',
                        name: 'role_id',
                        message: "Please select that employee's new role:",
                        choices: roleList
                    }
                ]).then(newEmpRole => {
                    role.lookupId(connection, newEmpRole.role_id)
                .then(roleId => {
                    newEmpRole.role_id = roleId[0][0].id;
                    return newEmpRole;
                }).then(newEmpRole => {
                    employee.lookupId(connection, newEmpRole.id)
                    .then(empId => {
                        newEmpRole.id = empId[0][0].id;
                        return newEmpRole;
                    }).then(newEmpRole => {
                        employee.updateRole(connection, {role_id: newEmpRole.role_id}, {id: newEmpRole.id}).then(() => {console.log(`Employee updated!`)}).then(() => {displayMenu()});
                    });
                });
                    
                });
            }).catch(console.log);
        }
        else if (menuChoice.choice === "Update an employee's manager"){
            let empList = [];
            let mgrList = [];
            employee.view(connection).then(empData => {empData[0].forEach(element => empList.push(element.first_name+' '+element.last_name))}).catch(console.log);
            employee.view(connection).then(empData => {empData[0].forEach(element => mgrList.push(element.first_name+' '+element.last_name))}).then(() => {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'id',
                        message: "Please select the employee to update:",
                        choices: empList
                    },
                    {
                        type: 'list',
                        name: 'manager_id',
                        message: "Please select that employee's new manager:",
                        choices: mgrList
                    }
                ]).then(newEmpMgr => {
                    employee.lookupId(connection, newEmpMgr.id)
                .then(empId => {
                    newEmpMgr.id = empId[0][0].id;
                    return newEmpMgr;
                }).then(newEmpMgr => {
                    employee.lookupId(connection, newEmpMgr.manager_id)
                    .then(mgrId => {
                        newEmpMgr.manager_id = mgrId[0][0].id;
                        return newEmpMgr;
                    }).then(newEmpMgr => {
                        employee.updateManager(connection, {manager_id: newEmpMgr.manager_id}, {id: newEmpMgr.id}).then(() => {console.log(`Employee updated!`)}).then(() => {displayMenu()});
                    });
                });
                    
                });
            }).catch(console.log);
        }
        //returns all employees in the company with the results sorted by their department
        else if (menuChoice.choice === 'View employees by department'){
            employee.viewByDept(connection).then(employeeData => {console.table(employeeData[0])}).then(() => {displayMenu()}).catch(console.log);
        }
        //retuns all employees in the comapny with the results sorted by their manager
        else if (menuChoice.choice === 'View employees by manager'){
            employee.viewByManager(connection).then(employeeData => {console.table(employeeData[0])}).then(() => {displayMenu()}).catch(console.log);
        }
        //deletes an employee from the company. If you try to delete an employee that is a manager of another employee, you will get an error because of
        //the FOREIGN KEY CONSTRAINT, you will first need to change that employee's manager before deleting.
        else if (menuChoice.choice === 'Delete an employee'){
            let empList = [];
            employee.view(connection).then(empData => {empData[0].forEach(element => empList.push(element.first_name+' '+element.last_name))}).then(() => {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'name',
                        message: "Please select the employee to delete:",
                        choices: empList
                    }
                ]).then(empChoice => {
                    employee.lookupId(connection, empChoice.name).then(empId => {
                        employee.delete(connection, empId[0][0].id).then(() => {console.log(`Employee deleted!`)}).then(() => {displayMenu()});
                    });
                });
            }).catch(console.log);

        }
        //quits the program and closes the database connection
        else if (menuChoice.choice === 'Quit Employee Manager'){
            console.log("Goodbye!");
            endConnection();
        }
    }).catch(console.log);
}
//displays the title screen and starts the app
titleScreen();
displayMenu();
