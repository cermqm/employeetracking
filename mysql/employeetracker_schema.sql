DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE edepartment (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) ,
  PRIMARY KEY (id)
);

CREATE TABLE erole (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary decimal,
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES edepartment(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id int,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES erole(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);