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
        // console.log(data);
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
    inquirer
      .prompt([
        {
          type: "input",
          name: "fireWho",
          message: "Please enter the Employee ID to remove?",
        },
      ])
      .then((data) => {
        console.log(data.fireWho);
        const query = `DELETE FROM employee WHERE id = ${data.fireWho}`;
        connection.query(query, (err, res) => {
          // console.log("--------------------");
          console.log(`${data.fireWho}'s employment has been severed`, res);
          startApp();
        });
      });
  }
  // DELETE FROM employee WHERE id = 6;

  function promoteEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "whichOne",
          message: "What is the Employee's ID to update?",
        },
        {
          type: "list",
          name: "watRole",
          message: "What role will the Employee now perform?",
          choices: [
            "Sales Lead",
            "Sales Rep",
            "Lead Engineer",
            "Software Engineer",
            "Accountant",
            "Legal Analyst",
            "Custodian",
          ],
        },
      ])
      .then((data) => {
        console.log(data);
        console.log(data.watRole);
        let newRole;
        if (data.watRole === "Sales Lead") {
          newRole = 1;
        } else if (data.watRole === "Sales Rep") {
          newRole = 2;
        } else if (data.watRole === "Lead Engineer") {
          newRole = 3;
        } else if (data.watRole === "Software Engineer") {
          newRole = 4;
        } else if (data.watRole === "Accountant") {
          newRole = 5;
        } else if (data.watRole === "Legal Analyst") {
          newRole = 6;
        } else newRole = 7;
        console.log(newRole);
        const query = `UPDATE employee
        SET role_id = ${newRole} 
        WHERE id = ${data.whichOne};`;
        connection.query(query, (err, res) => {
          // console.log("--------------------");
          console.log(
            `Employee #${data.whichOne} has been moved to the ${data.watRole} position`,
            res
          );
          startApp();
          // startApp();
        });
      });
  }

  function updateManager() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "whichOne",
          message: "Please enter the Employee's ID for Manager Assignment",
        },
        {
          type: "input",
          name: "watRole",
          message:
            "What is the Manager's ID that the employee will report to? Enter null if Employee does not report to anyone",
        },
      ])
      .then((data) => {
        console.log(data);
        const query = `UPDATE employee
        SET manager_id = ${data.watRole} 
        WHERE id = ${data.whichOne};`;
        connection.query(query, (err, res) => {
          console.log(`New manager assignment has been completed`, res);
          startApp();
        });
      });
  }
}
