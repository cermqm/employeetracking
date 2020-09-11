Select * from employeeTracker_db.edepartment;
Select * from employeeTracker_db.erole;
Select * from employeeTracker_db.employee;



Select id, name from edepartment;



SELECT `COLUMN_NAME` 
FROM `INFORMATION_SCHEMA`.`COLUMNS` 
WHERE `TABLE_SCHEMA`='employeeTracker_db' 
    AND `TABLE_NAME`='edepartment';
    
    
    SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='employeeTracker_db' AND TABLE_NAME='edepartment';
    
    
     
    SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, erole.title from employee join erole on employee.role_id=erole.id where erole.title='Manager';
    
    
    SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id from employee where employee.manager_id=1;
    
    select * from employee;
    
    Select erole.id, erole.title, erole.salary, edepartment.name from erole join edepartment on erole.department_id = edepartment.id;
    
    
    Select employee.id, employee.first_name, employee.last_name, erole.title, manager_id from employee join erole on employee.role_id = erole.id;

    
    