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
          choices: ["Sales", "Engineering", "Accounting", "Legal", "Custodial"],
        },
      ])
      .then((data) => {
        console.log(data);
        // console.log(data.firstName);
        // console.log(data.lastName);
        // console.log(data.watDept);
        let dept;
        if (data.watDept === "Sales") {
          dept = "1";
        } else if (data.watDept === "Engineering") {
          dept = "2";
        } else if (data.watDept === "Accounting") {
          dept = "3";
        } else if (data.watDept === "Legal") {
          dept = "4";
        } else dept = "5";
        const query = `INSERT into employee(first_name, last_name, role_id)
        Value("${data.firstName}", "${data.lastName}", "${dept}")
        `;
        connection.query(query, (err, res) => {
          // console.log("--------------------");
          console.log(`"${data.firstName} was added successfully!`, res);
          startApp();
        });

        startApp();
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
