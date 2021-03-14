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
                'Add employee',
                'Update employee role',
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

            case 'Add employee':
                addEmployee()
                break;

            case 'Update employee role':
                updateEmployeeRole()
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
    const sqlStatement = ("SELECT * FROM department");

    connection.query(sqlStatement, (err, res) => {
        if (err) throw err;
        const depart = res.map(element => {
            return { name: `${element.name}` }
        });

        inquirer.prompt([{
            type: "list",
            name: "department",
            message: "Choose department",
            choices: depart

        }]).then(response => {
            const sqlStatement2 = `SELECT e.first_name, e.last_name, e.role_id AS roles, CONCAT(m.first_name,' ',m.last_name) 
                AS manager, d.name as department FROM employee e
                LEFT JOIN roles r on e.role_id = r.id
                LEFT JOIN department d ON r.department_id = d.id
                LEFT JOIN employee m ON e.manager_id = m.id
                WHERE ?`
            connection.query(sqlStatement2, [{ name: response.department }], function (err, res1) {
                if (err) throw err;
                console.table(res1)

                // Rerun switch case function
                start();
            })
        })
    })
}

const addEmployee = () => {
    const sqlStatement = 'SELECT * FROM employee';
    connection.query(sqlStatement, (err, data) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                message: 'New Employee First Name: ',
                name: 'firstName'
            },
            {
                type: 'input',
                message: 'New Employee Last Name: ',
                name: 'lastName'
            },
            {
                type: 'input',
                message: 'New Employee Role ID: ',
                name: 'roleID',
                validate: (answer) => {
                    valid = /^[0-9]+$/.test(answer)
                    if (!valid) {
                        return console.log(" Numbers only")
                    }
                    return true;
                }
            },
            {
                type: 'input',
                message: 'New Employee Manager ID (if no manager, leave blank): ',
                name: 'managerID'
            }
        ]).then((response) => {

            sqlStatement2 = 'INSERT INTO employee SET ?';
            connection.query(sqlStatement2, 
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: response.roleID,
                    manager_id: response.managerID
                }, 
                err => {
                if (err) throw err;
        
                console.table([{First_Name: `${response.firstName}`, Last_Name: `${response.lastName}`, Role_ID: `${response.roleID}`, Manager_ID: `${response.managerID}`}]);

                // Rerun switch case function
                return start();
            });
        }).catch(err => {console.error(err)});
    })
}

const updateEmployeeRole = () => {
    query = 'SELECT * FROM employee';
    connection.query(query, (err, data) => {
        if (err) throw err;

        let employeesArray = [];
        data.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
               let employ = [id, first_name, last_name, role_id, manager_id];
               employeesArray.push(employ);
        });
        console.table(['Employee ID', 'First Name', 'Last Name', 'Role Id', 'Manager_ID'], employeesArray);

        inquirer.prompt([
            {
                type: 'choice',
                message: 'Employee ID to be updated:',
                name: 'selectEmployee',
                choices() {
                    const employeeIDArray = [];
                    data.forEach(({id}) => {
                        employeeIDArray.push(id);
                    });
                    return employeeIDArray;
                }
            },
            {
                type: 'input',
                message: 'New Role ID: ',
                name: 'roleID'
            }
        ]).then((response) => {

            queryInsert = 'UPDATE employee SET role_id = ? WHERE id = ?';
            connection.query(queryInsert, [response.roleID, response.selectEmployee], (err, data) => {
                if (err) throw err;
        
                console.table(data);

                // Rerun switch case function
                return start();
            });
        }).catch(err => {console.error(err)});
    });   
}

const viewRoles = () => {
    const sqlStatement = `SELECT * FROM roles`;
    connection.query(sqlStatement, (err, data) => {
        if (err) throw err;

        let rolesArray = [];

        data.forEach(({ title, salary, department_id }) => {
               let roles = [title, salary, department_id];
               rolesArray.push(roles);
        });

        console.log('\n');
        console.table(['Title', 'Salary', 'Department Id'], rolesArray);
        console.log('\n');

        // Rerun switch case function
        return start();
    });
}

const addRole = () => {
    let sqlStatement = `SELECT * FROM roles`
    connection.query(sqlStatement, (err, data) => {
        if (err) throw err
        inquirer.prompt([
            {
                type: "input",
                name: "roleId",
                message: "New Role ID: ",
                validate: val => {
                    if (!/^[0-9]+$/gi.test(val)) {
                        return "Numbers only";
                    }
                    return true;
                }
                
            }, {
                type: "input",
                name: "role",
                message: "New Role Title: ",
            }, {
                type: "input",
                name: "salary",
                message: "New Role Salary: ",
                validate: val => {
                    if (!/^[0-9]+$/gi.test(val)) {
                        return "Numbers only";
                    }
                    return true;
                }
            }, {
                type: "input",
                name: "deptId",
                message: "New Role Department ID: ",
                validate: val => {
                    if (!/^[0-9]+$/gi.test(val)) {
                        return "Numbers only";
                    }
                    return true;
                }
            }])
            .then(function (response) {
                let sqlStatement2 = `INSERT INTO roles VALUES (?,?,?,?)`
                connection.query(sqlStatement2, [response.roleId, response.role, response.salary, response.deptId], function (err) {
                    if (err) throw err;
                    console.log(`${response.role} added as new role`)

                    // Rerun switch case function
                    start();
                })
            })
    })
}

const viewDepartment = () => {
    const sqlStatement = 'SELECT * FROM department';
    connection.query(sqlStatement, (err, data) => {
        if (err) throw err;

        let deptsArray = [];
        data.forEach(({ dept_name }) => {
               let depts = [dept_name];
               deptsArray.push(depts);
        });

        console.log('\n');
        console.table(['Department Name'], deptsArray);
        console.log('\n');

        // Rerun switch case function
        return start();
    }); 

}

function addDepartment() {
    let sqlStatement = `SELECT * FROM department`
    connection.query(sqlStatement, (err, res) => {
        if (err) throw err
        inquirer.prompt([{
            type: "input",
            name: "deptId",
            message: "New department ID: ",
            validate: val => {
                if (!/^[0-9]+$/gi.test(val)) {
                    return "Numbers only";
                }
                return true;
            }
        }, {
            type: "input",
            name: "deptName",
            message: "Please enter name for new department",
            validate: (name) => {
                if (!/^[aA-zZ]+$/gi.test(name)) {
                    return "Text only";
                }
                return true;
            }
        }]).then(response => {
                let sqlStatement2 = `INSERT INTO department VALUES (?,?)`
                connection.query(sqlStatement2, [response.deptId, response.deptName], (err) => {
                    if (err) throw err
                    console.log(`${response.deptName} added as a new department`)

                    // Rerun switch case function
                    start();
                })
            })
    })

}