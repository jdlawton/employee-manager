const inquirer = require('inquirer');
const Department = require('./Department');
const Role = require('./Role');
const Employee = require('./Employee');

const displayMenu = (connection) => {
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
        if(menuChoice.choice === 'View all departments'){
            console.log("You chose to view all departments");
            const dept = new Department("department");
            console.log("TESTING");
            dept.view(connection);
            displayMenu(connection);
        }

        if (menuChoice.choice === 'Add a new department'){
            console.log("You chose to add a new department");
            //call function to add a new department
            displayMenu(connection);
        }

        if (menuChoice.choice === 'Delete a department'){
            console.log('You chose to delete a department');
            //fall function to delete a department
            displayMenu(connection);
        }

        if (menuChoice.choice === "View a department's utilized budget"){
            console.log('You chose to view a departments utilitzed budget');
            //call function to view utilized budget
            displayMenu(connection);
        }

        if (menuChoice.choice === 'View all company roles'){
            console.log('You chose to view all company roles');
            //call function to view all roles
            displayMenu(connection);
        }

        if (menuChoice.choice === 'Add a new role'){
            console.log('You chose to add a new role');
            //call function to add a role
            displayMenu(connection);
        }

        if (menuChoice.choice === 'Delete a role'){
            console.log('You chose to delete a role');
            //call function to delete role
            displayMenu(connection);
        }

        if (menuChoice.choice === 'View all employees'){
            console.log('You chose to view all employees');
            //call function to view employees
            displayMenu(connection);
        }

        if (menuChoice.choice === 'Add a new employee'){
            console.log('You chose to add a new employee');
            //call function to add employee
            displayMenu(connection);
        }

        if (menuChoice.choice === "Update an employee's role"){
            console.log('You chose to update an employee role');
            //call function to update role
            displayMenu(connection);
        }

        if (menuChoice.choice === "Update an employee's manager"){
            console.log('You chose to update an employee manager');
            //call function to update manager
            displayMenu(connection);
        }

        if (menuChoice.choice === 'View employees by department'){
            console.log('You chose to view employees by dept');
            //call function to view employees by dept
            displayMenu(connection);
        }

        if (menuChoice.choice === 'View employees by manager'){
            console.log('You chose to view employees by manager');
            //call function to view employees by manager
            displayMenu(connection);
        }

        if (menuChoice.choice === 'Delete an employee'){
            console.log('You chose to delete an employee');
            //call function to delete employee
            displayMenu(connection);
        }

        if (menuChoice.choice === 'Quit Employee Manager'){
            console.log('Goodbye!');
            return;
        }
    })
}

module.exports = displayMenu;