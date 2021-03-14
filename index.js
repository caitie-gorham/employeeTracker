// add dependencies
const inquirer = require('inquirer');
const connection = require('./config/connection.js');
const cTable = require('console.table');

// set up connection
connection.connect((err) => {
    if (err) throw err;

    // console log connection thread ID
    console.log(`Connection established via thread #: ${connection.threadId}.`);

    // kick off function that has inquirer prompt and the function start for each choice
    start();
});

// start function with inquirer prompt and switch/case for each choice
const start = () => {
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
    ]).then((response) => {
        switch (response.choices) {
            case 'View all employees':
                viewEmployees()
                break;

            case 'View all employees by department':
                viewEmployeesDep()
                break;

            case 'View all employees by manager':
                viewEmployeesMan()
                break;

            case 'Add employee':
                addEmployee()
                break;

            case 'Remove employee':
                removeEmployee()
                break;

            case 'Update employee role':
                updateEmployeeRole()
                break;

            case 'Update employee manager':
                updateEmployeeManager()
                break;

            case 'View all roles':
                viewRoles()
                break;

            case 'Add role':
                addRole()
                break;

            case 'View all departments':
                viewDepartment()
                break;

            case 'Add department':
                addDepartment()
                break;

            case 'Quit':
                connection.end()
        }
    }).catch(err => { console.error(err) });
};

const viewEmployees = () => {
    const sqlStatement = `SELECT * FROM employee`;
    connection.query(sqlStatement, (err, data) => {
        if (err) throw err;
        let employeesArray = [];
        data.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
            let employees = [id, first_name, last_name, role_id, manager_id];
            employeesArray.push(employees);
        });

        console.log('\n');
        console.table(['Employee ID', 'First Name', 'Last Name', 'Role Id', 'Manager ID'], employeesArray);
        console.log('\n');

        // Rerun switch case function
        return start();

    });
}

const viewEmployeesDep = () => {

}

const viewEmployeesMan = () => {

}

const addEmployee = () => {

}

const removeEmployee = () => {

}

const updateEmployeeRole = () => {

}

const updateEmployeeManager = () => {

}
const viewRoles = () => {

}

const addRole = () => {

}

const viewDepartment = () => {

}

const addDepartment = () => {

}