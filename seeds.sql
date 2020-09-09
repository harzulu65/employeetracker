
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 1, null),
    ("April", "Johnson", 2, 1),
    ("Carl", "Ross", 4, 1),
    ("Megan", "Watson", 3, 1),
    ("Crystal", "George", 1, null),
    ("Dwayne", "Spade", 2, 1),
    ("Joliene", "Marx", 4, 1),
    ("Camila", "Axelrod", 3, 1);

INSERT INTO emp_role
    (title, salary, department_id)
VALUES
    ("Manager", 100000, 1),
    ("Lead Engineer", 90000, 2),
    ("Engineer", 80000, 3),
    ("Quality", 80000, 4);

INSERT INTO department
    (dept_name)
VALUES
    ("Operations"),
    ("Engineering Manager"),
    ("Engineer"),
    ("Quality");