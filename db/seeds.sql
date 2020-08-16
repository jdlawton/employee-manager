/*the seeds file for the application databases. This file gets called when the npm script "seed" is invoked*/

USE personnelDB;

INSERT INTO department (name)
VALUES ("sales"), ("information technology"), ("accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("sales person", 50000, 1), ("sales manager", 60000, 1), ("web developer", 50000, 2), ("system administrator", 60000, 2), ("accountant", 50000, 3), ("accounts manager", 60000, 3), ("sales intern", 30000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mary", "Lewis", 2, null), ("Duncan", "Alan", 1, 1), ("Kelly", "Green", 1, 1), ("Jim", "Wilson", 4, null), ("Joe", "Lawton", 3, 4), ("Daniel", "Olson", 6, null), ("Rebecca", "Martin", 5, 6);