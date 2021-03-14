// add dependencies
const inquirer = require('inquirer');
const connection = require('./config/connection.js');

// set up connection
connection.connect((err) => {
    if (err) throw err;

    // console log connection thread ID
    console.log(`Connection established via thread #: ${connection.threadId}.`);

    // kick off function that has inquirer prompt and the function start for each choice
    start();
});

// start function with inquirer prompt and switch/case for each choice
function start() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choices',
            choices: [
                'View all employees',
                'View all employees by department',
                'View all employees by manager',
                'Add employee',
                'Remove employee',
                'Update employee role',
                'Update employee manager',
                'View all roles',
                'Add role',
                'View all departments',
                'Add department',
                'Quit'
            ]
        }
    ]).then(function ({ choices }) {
        if (choices != "Quit") {
            processChoice(choices, function () {
                start();
            })
        } else {
            connection.end()
        }
        console.log(choices);
    });
};

function switchCase(choices, spec) {
    switch (choices) {
        case 'View all employees':
            viewEmployees(spec)
            break;

        case 'View all employees by department':
            viewEmployeesDep(spec)
            break;

        case 'View all employees by manager':
            viewEmployeesMan(spec)
            break;

        case 'Add employee':
            addEmployee(spec)
            break;

        case 'Remove employee':
            removeEmployee(spec)
            break;

        case 'Update employee role':
            updateEmployeeRole(spec)
            break;

        case 'Update employee manager':
            updateEmployeeManager(spec)
            break;

        case 'View all roles':
            viewRoles(spec)
            break;

        case 'Add role':
            addRole(spec)
            break;

        case 'View all departments':
            viewDepartment(spec)
            break;

        case 'Add department':
            addDepartment(spec)
            break;
    }
}