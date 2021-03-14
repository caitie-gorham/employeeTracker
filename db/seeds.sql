-- values to insert into department table

INSERT INTO department (name) 
VALUE ("Sales");

INSERT INTO department (name) 
VALUE ("Engineering");

INSERT INTO department (name) 
VALUE ("Finance");

INSERT INTO department (name) 
VALUE ("Legal");

-- values insert into roles table

INSERT INTO roles (title, salary, department_id) 
VALUE ("Sales Lead", 100000, 1);

INSERT INTO roles (title, salary, department_id) 
VALUE ("Salesperson" , 80000, 1);

INSERT INTO roles (title, salary, department_id) 
VALUE ("Lead Engineer", 150000, 2);

INSERT INTO roles (title, salary, department_id) 
VALUE ("Software Engineer", 120000, 2);

INSERT INTO roles (title, salary, department_id) 
VALUE ("Accountant", 125000, 3);

INSERT INTO roles (title, salary, department_id) 
VALUE ("Legal Team Lead", 250000, 4);

INSERT INTO roles (title, salary, department_id) 
VALUE ("Lawyer", 190000, 4);

-- values insert into employee table

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUE ("John", "Doe", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUE ("Mike", "Chan", 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUE ("Ashley", "Rodriguez", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUE ("Kevin", "Tupik", 4, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUE ("Malia", "Brown", 5, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUE ("Sarah", "Lourd", 6, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUE ("Tom", "Allen", 7, 4);

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;