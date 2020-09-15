var inquirer = require("inquirer");
const prompts = require("prompts");
const cTable = require("console.table");
var mysql = require("mysql");
var clear = require("clear");
var cont = true;
var clear = require("clear");
var menu_option = "";
var del_emp = [];
var array = "";
var mysql = require("mysql");

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

async function start() {
  clear();
  const second = await inquirer
    .prompt([
      {
        type: "list",
        name: "name",
        message: "What is user's name 2?",
        choices: [
          "View ALL employees",
          "View ALL employees by DEPARTMENT",
          "View ALL employees by MANAGER",
          "ADD employee",
          "REMOVE employee",
          "UPDATE employee ROLE",
          "UPDATE employee MANAGER",
        ],
      },
    ])
    .then(function (answer) {
      //menu_option = answer.name;
      get_menu(answer.name);
    });
}

async function get_menu(menu) {
  //await start();
  if (menu === "View ALL employees") {
    clear();
    //console.log("this : ", menu_option, opt);
    connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      //console.log(res);
      const table = cTable.getTable(res);
      console.log(table);
      menu = "";
    });
  } else if (menu === "View ALL employees by DEPARTMENT") {
    clear();
    //console.log("this : ", menu_option);
    connection.query(
      "SELECT * FROM employee as e JOIN emp_role as r ON e.role_id = r.id JOIN department as d on d.id = r.id ORDER by d.dept_name",
      function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        //console.log(res);
        const table = cTable.getTable(res);
        console.log(table);
        menu = "";
      }
    );
  } else if (menu === "View ALL employees by MANAGER") {
    clear();
    //console.log("this : ", menu_option);
    connection.query(
      "SELECT * FROM employee as e WHERE e.manager_id IS NOT NULL ORDER BY e.manager_id",
      function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        //console.log(res);
        const table = cTable.getTable(res);
        console.log(table);
        menu = "";
      }
    );
  } else if (menu === "ADD employee") {
    const add_empl = await add_employee();
    menu = "";
  } else if (menu === "REMOVE employee") {
    clear();
    connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      //const table = cTable.getTable(res);
      //console.log(table);
      listToDelete(res);
      menu = "";
    });
  } else if (menu === "UPDATE employee ROLE") {
    clear();
    connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      //const table = cTable.getTable(res);
      //console.log(table);
      listToUpdate(res);
      menu = "";
    });
  } else if (menu === "UPDATE employee MANAGER") {
    clear();
    connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      //const table = cTable.getTable(res);
      //console.log(table);
      listToUpdateManager(res);
      menu = "";
    });
  }
  start();
}

//===============================================================================

async function listToDelete(allEmployees) {
  //console.log("here : ", allEmployees);
  let allEmployeesChoiceArray = allEmployees.map(
    (each) => `id: ${each.id} name: ${each.first_name} `
  );
  //console.log(allEmployeesChoiceArray);
  const second = await inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "What is the record to delete ?",
        choices: allEmployeesChoiceArray,
      },
    ])
    .then(function (answer) {
      //console.log(answer.employee);
      var employeeSplit = answer.employee.split(" ");
      //console.log(employeeSplit);
      var id = employeeSplit[1];
      //console.log(id);
      connection.query(
        `DELETE FROM employee as e WHERE e.id = ${id}`,
        menu_option,
        function (err, res) {
          if (err) throw err;
          console.log(" employee deleted!\n");
        }
      );
    });
  start();
}

//List to Update employee======================================================

async function listToUpdate(allEmployees) {
  //console.log("here : ", allEmployees);
  let allEmployeesChoiceArray = allEmployees.map(
    (each) =>
      `id: ${each.id} name: ${each.first_name} role_id: ${each.role_id} `
  );
  //console.log(allEmployeesChoiceArray);
  const second = await inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Select the record to update?",
        choices: allEmployeesChoiceArray,
      },
    ])
    .then(function (answers) {
      //console.log(answer.employee);
      var employeeSplit = answers.employee.split(" ");
      //console.log(employeeSplit);
      var id = employeeSplit[5];
      //console.log(id);
      update_employee_role(id);
      //console.log(id);
    });
}

// UPDATE employee Manager==========================================================

async function listToUpdateManager(allEmployees) {
  //console.log("here : ", allEmployees);
  clear();
  let allEmployeesChoicesArry = allEmployees.map(
    (each) =>
      `id: ${each.id} name: ${each.first_name} manager_id: ${each.manager_id} `
  );
  //console.log(allEmployeesChoiceArry);
  const second = await inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Select the record to update?",
        choices: allEmployeesChoicesArry,
      },
    ])
    .then(function (answers) {
      //console.log(answer.employee);
      var employeeSplit = answers.employee.split(" ");
      //console.log(employeeSplit);
      var id = employeeSplit[1];
      //console.log(id);
      update_employee_manager(id);
      //console.log(id);
    })
    .catch((error) => {
      throw error;
    });
}

// UDPDATE employee Manager ========================================================

async function update_employee_manager(emp_id) {
  //console.log(emp_id);
  clear();
  const third = await inquirer
    .prompt([
      {
        type: "number",
        name: "manager",
        message: "What is the NEW MANAGER of the employee?",
      },
    ])
    .then(function (answer) {
      menu_option = answer;
      //console.log(menu_option);
      connection.query(
        `UPDATE employee SET manager_id = ${answer.manager} WHERE id = ${emp_id}`,
        function (err, res) {
          if (err) throw err;
          console.log(" employee manager updated!\n");
          menu_option = "";
        }
      );
    });
  //start();
  get_menu("View ALL employees");
}

// UPDATE employee ROLE ============================================================

async function update_employee_role(emp_id) {
  //console.log(emp_id);
  const third = await inquirer
    .prompt([
      {
        type: "number",
        name: "role",
        message: "What is the NEW role of the employee?",
      },
    ])
    .then(function (answer) {
      clear();
      connection.query(
        `UPDATE employee as e SET e.role_id = ${answer.role} WHERE e.id = ${emp_id}`,
        function (err, res) {
          if (err) throw err;
          console.log(" employee role updated!\n");
          menu_option = "";
        }
      );
    });
  start();
}

//ADD employee ================================================================

async function add_employee() {
  const third = await inquirer
    .prompt([
      {
        type: "text",
        name: "first_name",
        message: "What is the first name of the employee?",
      },
      {
        type: "text",
        name: "last_name",
        message: "What is the last name of the employee?",
      },
      {
        type: "number",
        name: "role_id",
        message: "What is the role of the employee?",
      },
    ])
    .then(function (answer) {
      menu_option = answer;
      //console.log(menu_option);
      connection.query("INSERT INTO employee SET ?", [menu_option], function (
        err,
        res
      ) {
        if (err) throw err;
        console.log(res.affectedRows + " employee added!\n");
        menu_option = "";
      });
    });
}

// ============================================================================

start();
