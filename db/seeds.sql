USE personnelDB;

INSERT INTO department (name)
VALUES ("sales"), ("administration"), ("development"), ("information technology"), ("accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("sales person", 65432, 1), ("sales manager", 76543, 1), ("web developer", 65432, 3), ("system administrator", 65432, 4), ("administrative assistant", 54321, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Manager", "Man", 3, null), ("Joe", "Lawton", 3, 1), ("Sales", "Manager", 2, null), ("Sales", "Guy", 1, 3), ("Mr", "UNIX", 4, null), ("Girl", "Friday", 5, null);
