const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");

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
    console.log("Who works here?");
    startApp();
  }
  function showDept() {
    console.log("Who works where?");
    startApp();
  }
  function showMngmnt() {
    console.log("Who works for who?");
    startApp();
  }
  function addEmployee() {
    console.log("Hire someone?");
    startApp();
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

init();
