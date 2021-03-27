const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");

function init() {
  function startApp() {
    console.log("Let's get started");
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
            console.log("Fire someone?");
            fireEmployee();
            break;
          case "Update Employee Role":
            console.log("Promote someone?");
            promoteEmployee();
            break;
          case "Update Employee Manager":
            console.log("New Manager?");
            updateManager();
            break;
        }
      });
  }
  startApp();
}

function showOrg() {
  console.log("Who works here?");
  init();
}

function showDept() {
  console.log("Who works where?");
}

function showMngmnt() {
  console.log("Who works for who?");
}

function addEmployee() {
  console.log("Hire someone?");
}

init();
