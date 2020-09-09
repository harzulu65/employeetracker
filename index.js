var inquirer = require("inquirer");
const prompts = require("prompts");
const cTable = require("console.table");
var mysql = require("mysql");
var clear = require("clear");
const { start } = require("repl");
var functions = require("./functions.js");
var cont = true;
var emp_functions = {};
var key_g = 7;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Test123!",
  database: "emp_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(
    "connected as id " + connection.threadId + "\n Press Any Key to Continue \n"
  );
});

function re_start() {
  start_q();
}

(async function start_q() {
  const questions = [
    {
      type: "select",
      name: "value",
      message: "What do you want o do?",
      choices: [
        "View ALL employees",
        "View ALL employees by DEPARTMENT",
        "View ALL employees by MANAGER",
        "ADD employee",
        "REMOVE employee",
        "UPDATE employee ROLE",
        "UPDATE employee MANAGER",
        "Exit",
      ],
    },
  ];
  const onCancel = prompt=> {
    console.log('Never stop prompting!');
    return true;
  }
  const response = await prompts(questions, { onCancel });
  key_g = response.value;
  if (key_g < 8) {
    console.log("aqui: ", response.value);
    if (key_g === 0) {
      connection.query(
        "SELECT * FROM employee as e JOIN emp_role as r ON e.role_id = r.id JOIN department as d on d.id = r.id",
        function (err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          //console.log(res);
          const table = cTable.getTable(res);
          console.log(table);
        }
      );
    } else if (key_g === 1) {
      if (menu_option === "View ALL employees") {
        //console.log("this : ", menu_option, opt);
        connection.query(
          "SELECT * FROM employee as e JOIN emp_role as r ON e.role_id = r.id JOIN department as d on d.id = r.id",
          function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            //console.log(res);
            const table = cTable.getTable(res);
            console.log(table);
          }
        );
      }
    } else if (key_g === 2) {
      console.log("Selecting all employees by Manager...\n");
      connection.query(
        "SELECT * FROM employee as e WHERE e.manager_id IS NOT NULL ORDER BY e.manager_id",
        function (err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          //console.log(res);
          const table = cTable.getTable(res);
          console.log(table);
        }
      );
    } else if (key_g === 3) {
      //clear();
      var answers = functions.add_employee();
      //(first_name, last_name, role_id, manager_id)
    } else if (key_g === 4) {
      //query employees
      connection.query("SELECT first_name, employee.id  FROM employee", function (
        err,
        res
      ) {
        if (err) throw err;
        del_emp = JSON.parse(JSON.stringify(res));
        array = JSON.stringify(res);
        console.log("Prompt Employee...\n");
        console.log("Selecting one employee...\n", del_emp, res);
        //var answer = functions.list_employee(answersr);
      });
      //remove employee
      console.log("exit 4");
      key_g = 8;
    } else if (key_g === 5) {
      console.log("Update Employee Role...\n");
      connection.query(
        "SELECT * FROM employee as e WHERE e.manager_id IS NOT NULL ORDER BY e.manager_id",
        function (err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          //console.log(res);
          const table = cTable.getTable(res);
          console.log(table);
        }
      );
    } else if (key_g === 6) {
      console.log("Update Employee Manager...\n");
      connection.query(
        "SELECT * FROM employee as e WHERE e.manager_id IS NOT NULL ORDER BY e.manager_id",
        function (err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          //console.log(res);
          const table = cTable.getTable(res);
          console.log(table);
        }
      );
    } 
  }

  //re_start();
  // => response => { username, age, about }
})();
