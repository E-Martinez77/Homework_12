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
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Accounting"), ("Legal"), ("Custodial");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 45,000, 1), ("Sales Rep", 30,000, 2), ("Lead Engineer", 50,000, 3), ("Software Engineer", 50,000, 4), ("Accountant", 45,000, 5), ("Legal Analyst", 75,000, 6), ("Custodian", 25,000, 7)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Marvin", "Harris", 1, 1), ("Sheila", "Rivera", 3, 3), ("Usman", "Gupta", 2, 1), ("Robert", "Miller", 4, 1), ("Eloy", "Martinez", 7, 1)

