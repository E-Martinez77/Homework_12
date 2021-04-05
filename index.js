const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "5x8BYz323!9",
  database: "employee_trackerDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  init();
});

function init() {
  console.log("Let's get started");
  function startApp() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "watDo",
          message: "What would you like to do?",
          choices: [
            "View All Employees",
            "View All Employees By Department",
            "View all Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
          ],
        },
      ])
      .then((choice) => {
        switch (choice.watDo) {
          case "View All Employees":
            showOrg();
            break;
          case "View All Employees By Department":
            showDept();
            break;
          case "View all Employees By Manager":
            showMngmnt();
            break;
          case "Add Employee":
            addEmployee();
            break;
          case "Remove Employee":
            fireEmployee();
            break;
          case "Update Employee Role":
            promoteEmployee();
            break;
          case "Update Employee Manager":
            updateManager();
            break;
        }
      });
  }
  startApp();

  function showOrg() {
    const query = `SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS Employee,title,department.name AS department, role.salary, CONCAT(e.first_name, " ", e.last_name) AS manager FROM employee
    JOIN role
    ON employee.role_id = role.id 
    join department
    ON role.department_id = department.id
    LEFT JOIN employee e 
    ON employee.manager_id = e.id;`;
    connection.query(query, (err, res) => {
      // console.log("--------------------");
      console.table("ORG Chart", res);
      startApp();
    });
  }
  function showDept() {
    const query = `SELECT department.name AS department, CONCAT(employee.first_name," ", employee.last_name) AS Employee,title FROM employee
    JOIN role
    ON employee.role_id = role.id 
    join department
    ON role.department_id = department.id
    LEFT JOIN employee e 
    ON employee.manager_id = e.id;`;
    connection.query(query, (err, res) => {
      // console.log("--------------------");
      console.table("Department Listing", res);
      startApp();
    });
  }
  function showMngmnt() {
    const query = `SELECT CONCAT(e.first_name, " ", e.last_name) AS manager, CONCAT(employee.first_name," ", employee.last_name) AS Employee,title,department.name AS department FROM employee
    JOIN role
    ON employee.role_id = role.id 
    join department
    ON role.department_id = department.id
    LEFT JOIN employee e 
    ON employee.manager_id = e.id;
    `;
    connection.query(query, (err, res) => {
      // console.log("--------------------");
      console.table("Management Listing", res);
      startApp();
    });
  }
  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is your Employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is your Employee's last name?",
        },
        {
          type: "list",
          name: "watDept",
          message: "What Department does your Employee report to?",
          choices: [
            "1-Sales",
            "2-Engineering",
            "3-Accounting",
            "4-Legal",
            "5-Custodial",
          ],
        },
      ])
      .then((data) => {
        console.log(data);
      });
    // const query = ``;
    // connection.query(query, (err, res) => {
    //   console.log("New Employee added");
    // });
    // console.log("Hire someone?");
    // startApp();
  }
  function fireEmployee() {
    console.log("Fire someone?");
    startApp();
  }
  function promoteEmployee() {
    console.log("Promote someone?");
    startApp();
  }
  function updateManager() {
    console.log("New Manager?");
    startApp();
  }
}
