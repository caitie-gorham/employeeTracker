DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30)
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  department_id INTEGER,
  role_id INTEGER,
  PRIMARY KEY (id)
);
