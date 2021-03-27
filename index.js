const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");

function startApp() {
  console.log("Let's get started");
  inquirer.prompt([
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
  ]);
}

startApp();
