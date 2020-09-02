Select * from employeeTracker_db.edepartment;
Select * from employeeTracker_db.erole;
Select * from employeeTracker_db.employee;



Select id, name from edepartment;



SELECT `COLUMN_NAME` 
FROM `INFORMATION_SCHEMA`.`COLUMNS` 
WHERE `TABLE_SCHEMA`='employeeTracker_db' 
    AND `TABLE_NAME`='edepartment';
    
    
    SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='employeeTracker_db' AND TABLE_NAME='edepartment'