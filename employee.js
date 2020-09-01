var mysql = require("mysql");
var inquirer = require("inquirer");

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

connection.connect(function(err) {
    if (err) throw err;
    mainMenu();
});

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
                "View Employees"
            ]
        })
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
            }
        });
}

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
            departmentobj = { ID: res[i].id, Department: res[i].name }
            departmentarray.push(departmentobj);
        }
        console.log("");
        console.table(departmentarray);
        console.log("");

        mainMenu();
    });
};

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
                console.log("Please fill out all inputs - title, salary and department_id...");
                console.log("****************************************************************");
                console.log("")
                mainMenu();
            }

        });
}


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