var mysql = require("mysql");
var inquirer = require("inquirer");
var $ = jQuery = require('jquery');
const Promise = require('promise')


const { restoreDefaultPrompts } = require("inquirer");

// setup global variables
var employeebymanagersarray = [];
var managerarray = [];

// database connection configuration
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "cermqm",

    // Your password
    password: "cermqm",
    database: "employeeTracker_db"
});

// Run create Management Array - this is not needed if I can figure out how to run functions async

// connect to database and jump to mainMenu
connection.connect(function(err) {
    if (err) throw err;
    mainMenu();
});

createmarray();


// Main menu for program
function mainMenu() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add Departments",
                "Add Roles",
                "Add Employees",
                "View Departments",
                "View Roles",
                "View Employees",
                "Update Role",
                "Update Manager",
                "View Employees by Manager"
            ]
        })
        // Case statement for selection of menu item
        .then(function(answer) {
            switch (answer.action) {
                case "Add Departments":
                    addDepartments();
                    break;
                case "Add Roles":
                    addRoles();
                    break;
                case "Add Employees":
                    addEmployees();
                    break;
                case "View Departments":
                    viewDepartments();
                    break;

                case "View Roles":
                    viewRoles();
                    break;
                case "View Employees":
                    viewEmployees();
                    break;
                case "Update Role":
                    updateRole();
                    break;
                case "Update Manager":
                    updateManager();
                    break;
                case "View Employees by Manager":
                    viewEmployeesByManager();
                    break;
            }
        });
}
// Add departments function - allows us to create new departments 
function addDepartments() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What is the name of the department that you would like to add?"
        })
        .then(function(answer) {
            var query = "INSERT INTO edepartment (name) VALUES (?)";
            if (answer.department != "") {
                connection.query(query, [answer.department], function(err, res) {
                    if (err) {
                        console.log("")
                        console.log("****************************************************************");
                        console.log("An error occurred! - ", err.sqlMessage);
                        console.log("****************************************************************");
                        console.log("")
                        mainMenu();
                    } else mainMenu();
                });
            } else {
                console.log("")
                console.log("****************************************************************");
                console.log("Please type in the department name...");
                console.log("****************************************************************");
                console.log("")
                mainMenu();
            }
        });
}
// View department function to view the departments in the database
function viewDepartments() {
    // var querycolumns = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='employeeTracker_db' AND TABLE_NAME='edepartment'";
    // connection.query(querycolumns, function(err, res) {
    //     for (let i = 0; i < res.length; i++) {
    //         console.log("Column " + i + " " + JSON.stringify(res[i]));
    //     }
    // });
    var query = "Select id, name from edepartment";
    connection.query(query, function(err, res) {

        departmentarray = [];

        for (let i = 0; i < res.length; i++) {
            console.log("department name = " + res[i].name);
            departmentobj = { ID: res[i].id, department: res[i].name }
            departmentarray.push(departmentobj);
        }

        console.log("departmentarray = ", departmentarray);

        for (let i = 0; i < departmentarray.length; i++) {
            console.log("departmentarray[i] = ", departmentarray[i].department)
        }

        console.log("");
        console.table(departmentarray);
        console.log("");

        mainMenu();
    });
};

// Add roles function - to add roles to the database
function addRoles() {
    inquirer
        .prompt([{
                name: "title",
                type: "input",
                message: "What is the Title of the Role that you would like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the Salary for this Title?"
            },
            {
                name: "department_id",
                type: "input",
                message: "What is the Department ID for this Title?"
            }
        ])
        .then(function(answer) {
            var query = "INSERT INTO erole (title, salary, department_id) VALUES (?, ?, ?)";
            if (answer.title != "" & answer.salary != "" & answer.department_id != "") {
                connection.query(query, [answer.title, answer.salary, answer.department_id], function(err, res) {
                    if (err) {
                        console.log("")
                        console.log("****************************************************************");
                        console.log("An error occurred! - ", err.sqlMessage);
                        console.log("****************************************************************");
                        console.log("")
                        mainMenu();
                    } else mainMenu();
                });
            } else {
                console.log("")
                console.log("****************************************************************");
                console.log("Please fill out all inputs - title, salary and department_id...");
                console.log("****************************************************************");
                console.log("")
                mainMenu();
            }

        });
}

// View roles function - to view the roles in the database
function viewRoles() {
    var query = "Select id, title, salary, department_id from erole";
    connection.query(query, function(err, res) {

        rolearray = [];
        for (let i = 0; i < res.length; i++) {
            roleobj = { ID: res[i].id, Title: res[i].title, Salary: res[i].salary, department_id: res[i].department_id }
            rolearray.push(roleobj);
        }
        console.log("");
        console.table(rolearray);
        console.log("");

        mainMenu();
    });
};

// Add employees function - to add employees to the database
function addEmployees() {
    inquirer
        .prompt([{
                name: "first_name",
                type: "input",
                message: "What is the first name of the employee that you would like to add?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the last name of the employee that you would like to add?"
            },
            {
                name: "role_id",
                type: "input",
                message: "What is the Role ID for the employee?"
            },
            {
                name: "manager_id",
                type: "input",
                message: "What is the Manager ID for this employee?"
            }
        ])
        .then(function(answer) {
            var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
            if (answer.first_name != "" & answer.last_name != "" & answer.role_id != "" & answer.manager_id != "") {
                connection.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], function(err, res) {
                    if (err) {
                        console.log("")
                        console.log("****************************************************************");
                        console.log("An error occurred! - ", err.sqlMessage);
                        console.log("****************************************************************");
                        console.log("")
                        mainMenu();
                    } else mainMenu();
                });
            } else {
                console.log("")
                console.log("****************************************************************");
                console.log("Please fill out all inputs - First Name, Last Name, Role ID and Manager ID");
                console.log("****************************************************************");
                console.log("")
                mainMenu();
            }

        });
}

// View employees - to view the employees in the database
function viewEmployees() {
    var query = "Select id, first_name, last_name, role_id, manager_id from employee";
    connection.query(query, function(err, res) {
        employeesarray = [];
        for (let i = 0; i < res.length; i++) {
            employeeobj = { ID: res[i].id, First_Name: res[i].first_name, Last_Name: res[i].last_name, Role_ID: res[i].role_id, Manager_ID: res[i].manager_id }
            employeesarray.push(employeeobj);
        }
        console.log("");
        console.table(employeesarray);
        console.log("");

        mainMenu();
    });
};

// function update role - this will allow you to update the role for an employee
function updateRole() {
    var employeesarray = [];
    var rolearray = [];
    var queryemp = "Select id, first_name, last_name, role_id from employee";
    connection.query(queryemp, function(err, res) {
        for (let i = 0; i < res.length; i++) {
            // employeerecord = { name: { last_name: res[i].last_name, first_name: res[i].first_name }, value: { id: res[i].id } };
            // employeerecord = res[i].first_name + " " + res[i].last_name + " (" + res[i].id + ") ";
            employeerecord = { name: res[i].first_name + " " + res[i].last_name, value: res[i].id };
            employeesarray.push(employeerecord);
        }

        var queryrole = "SELECT erole.id, erole.title from erole";
        connection.query(queryrole, function(err, role) {
            for (let i = 0; i < role.length; i++) {
                rolerecord = { name: role[i].title, value: role[i].id };
                rolearray.push(rolerecord);
            }

            // console.log("employeesearray = ", employeesarray);
            // console.log("managerearray = ", managerarray);

            inquirer
                .prompt([{
                    name: "employeetoupdate",
                    type: "list",
                    message: "Select an employee for manager update?",
                    choices: employeesarray
                }, {
                    name: "newrole",
                    type: "list",
                    message: "Select a role to update employee with?",
                    choices: rolearray
                }])
                .then(function(answer) {
                    // console.log("answer.manager = " + answer);
                    // console.log("answer.employeetoupdate = " + answer.employeetoupdate);
                    // console.log("answer.newmanager = " + answer.newmanager);

                    var query = "UPDATE employee set role_id=? where employee.id=?";
                    if (answer.department != "") {
                        connection.query(query, [answer.newrole, answer.employeetoupdate], function(err, res) {
                            if (err) {
                                console.log("")
                                console.log("****************************************************************");
                                console.log("An error occurred! - ", err.sqlMessage);
                                console.log("****************************************************************");
                                console.log("")
                                mainMenu();
                            } else mainMenu();
                        });
                    } else {
                        console.log("")
                        console.log("****************************************************************");
                        console.log("Please select all inputs - employee and new role...");
                        console.log("****************************************************************");
                        console.log("")
                        mainMenu();
                    }
                });
        })
    })
}

// Update manager function - to update the manager for an employee
function updateManager() {
    var employeesarray = [];
    var managerarray = [];
    var queryemp = "Select id, first_name, last_name, role_id from employee";
    connection.query(queryemp, function(err, res) {
        for (let i = 0; i < res.length; i++) {
            // employeerecord = { name: { last_name: res[i].last_name, first_name: res[i].first_name }, value: { id: res[i].id } };
            // employeerecord = res[i].first_name + " " + res[i].last_name + " (" + res[i].id + ") ";
            employeerecord = { name: res[i].first_name + " " + res[i].last_name, value: res[i].id };
            employeesarray.push(employeerecord);
        }

        var querymgr = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, erole.title from employee join erole on employee.role_id=erole.id where erole.title='Manager'";
        connection.query(querymgr, function(err, mgr) {
            for (let i = 0; i < mgr.length; i++) {
                managerrecord = { name: mgr[i].first_name + " " + mgr[i].last_name, value: mgr[i].id };
                managerarray.push(managerrecord);
            }

            // console.log("employeesearray = ", employeesarray);
            // console.log("managerearray = ", managerarray);

            inquirer
                .prompt([{
                    name: "employeetoupdate",
                    type: "list",
                    message: "Select an employee for manager update?",
                    choices: employeesarray
                }, {
                    name: "newmanager",
                    type: "list",
                    message: "Select a Manager to update employee with?",
                    choices: managerarray
                }])
                .then(function(answer) {
                    // console.log("answer.manager = " + answer);
                    // console.log("answer.employeetoupdate = " + answer.employeetoupdate);
                    // console.log("answer.newmanager = " + answer.newmanager);

                    var query = "UPDATE employee set manager_id=? where employee.id=?";
                    if (answer.department != "") {
                        connection.query(query, [answer.newmanager, answer.employeetoupdate], function(err, res) {
                            if (err) {
                                console.log("")
                                console.log("****************************************************************");
                                console.log("An error occurred! - ", err.sqlMessage);
                                console.log("****************************************************************");
                                console.log("")
                                mainMenu();
                            } else mainMenu();
                        });
                    } else {
                        console.log("")
                        console.log("****************************************************************");
                        console.log("Please select all inputs - employee and new manager...");
                        console.log("****************************************************************");
                        console.log("")
                        mainMenu();
                    }
                });
        })
    })
}

// View employee by manager - this function will allow you to view employees by manager - still needs some work but I ran out of time.
function viewEmployeesByManager() {
    createebmarray();
};

async function createmarray() {

    await new Promise(resolve => {
        var querymgr = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, erole.title from employee join erole on employee.role_id=erole.id where erole.title='Manager'";
        connection.query(querymgr, function(err, mgr) {
                for (let i = 0; i < mgr.length; i++) {
                    managerrecord = { name: mgr[i].first_name + " " + mgr[i].last_name, id: mgr[i].id };
                    managerarray.push(managerrecord);
                }
                // console.log("managerearray in createmarray = ", managerarray);

            })
            // console.log('createmarray resolved')
        resolve();

        // createebmarray();
    })
};

async function createebmarray() {

    // await createmarray();

    employeebymanagersarray = [];

    // managerarray = [{ name: 'Michael Mink', id: 1 }, { name: 'Andrew Mink', id: 5 }, { name: 'Jenni Otte', id: 6 }, { name: 'Allan Otte', id: 7 }];

    await new Promise(resolve => {

        for (let i = 0; i < managerarray.length; i++) {
            queryemployeebymanager = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id from employee where employee.manager_id=?";
            var managerarrayid = managerarray[i].id;
            connection.query(queryemployeebymanager, [managerarrayid], function(err, res) {

                // console.log("res = ", res);


                if (err) {
                    console.log("")
                    console.log("****************************************************************");
                    console.log("An error occurred! - ", err.sqlMessage);
                    console.log("****************************************************************");
                    console.log("")
                }

                if (res.length > 0) {

                    // console.log("i = " + i);
                    // console.log("managerearray = ", managerarray);
                    // console.log("managerarray[i].id = " + managerarray[i].id);
                    // console.log("res[i].id = " + res[i].id);
                    // console.log("res[i].first_name = " + res[i].first_name);
                    // console.log("res[i].last_name = " + res[i].last_name);
                    // console.log("res[i].role_id = " + res[i].role_id);
                    // console.log("res[i].manager_id = " + res[i].manager_id);
                    // console.log("managerarray[i] = " + JSON.stringify(managerarray[i]));
                    // console.log("managerarray[i].name = " + managerarray[i].name);

                    for (let z = 0; z < res.length; z++) {
                        employeebymanagerobj = { ID: res[z].id, First_Name: res[z].first_name, Last_Name: res[z].last_name, Role_ID: res[z].role_id, Manager_ID: res[z].manager_id, Manager: managerarray[i].name };
                        employeebymanagersarray.push(employeebymanagerobj);
                    }
                }
                console.log("");
                console.table(employeebymanagersarray);
                console.log("");
            })
            console.log("employeebymanagersarray = ", employeebymanagersarray);
        }
        mainMenu();
        resolve();
    })
}