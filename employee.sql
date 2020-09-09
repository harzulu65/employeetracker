DROP DATABASE IF EXISTS emp_trackerDB;

CREATE DATABASE emp_trackerDB;

USE emp_trackerDB;

CREATE TABLE employee
(
    id INT NOT NULL
    AUTO_INCREMENT,
  first_name VARCHAR
    (45) NULL,
  last_name VARCHAR
    (45) NULL,
  role_id INT ,
  manager_id INT NULL,
  PRIMARY KEY
    (id),
  FOREIGN KEY
    (role_id) REFERENCES emp_role
    (id)
);

    CREATE TABLE emp_role
    (
        id INT NOT NULL
        AUTO_INCREMENT,
  title VARCHAR
        (45) NULL,
  salary DECIMAL
        (6) NULL,
  department_id INT NULL,
  PRIMARY KEY
        (id),
  FOREIGN KEY
        (department_id) REFERENCES department
        (id)
);

        CREATE TABLE department
        (
            id INT NOT NULL
            AUTO_INCREMENT,
  dept_name VARCHAR
            (45) NULL,
  PRIMARY KEY
            (id)
);
