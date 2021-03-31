DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Accounting"), ("Legal"), ("Custodial");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 45000, 1), ("Sales Rep", 30000, 1), ("Lead Engineer", 50000, 2), ("Software Engineer", 50000, 2), ("Accountant", 45000, 3), ("Legal Analyst", 75000, 4), ("Custodian", 25000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Marvin", "Harris", 1, NULL),("Usman", "Gupta", 2, 1), ("Sheila", "Rivera", 3, 2), ("Robert", "Miller", 4, 1), ("Eloy", "Martinez", 5, 1);

