INSERT INTO edepartment (name) VALUES ('Engineering');
INSERT INTO edepartment (name) VALUES ('Human Resources');
INSERT INTO edepartment (name) VALUES ('Consulting');
INSERT INTO edepartment (name) VALUES ('Nursing');
INSERT INTO edepartment (name) VALUES ('Operations');

INSERT INTO erole (title, salary, department_id) VALUES ('Consultant', 80000, 3);
INSERT INTO erole (title, salary, department_id) VALUES ('Analyst', 30000, 2);
INSERT INTO erole (title, salary, department_id) VALUES ('Nurse', 100000, 4);
INSERT INTO erole (title, salary, department_id) VALUES ('Engineer', 130000, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Michael', 'Mink', 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Dalton', 'Mink', 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Dyelan', 'Mink', 1, 2);