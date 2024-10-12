CREATE TABLE CATEGORY (
    CATEGORY_ID INT PRIMARY KEY AUTO_INCREMENT,
    NAME VARCHAR(50) NOT NULL
);


CREATE TABLE FUNDRAISER (
    FUNDRAISER_ID INT PRIMARY KEY AUTO_INCREMENT,
    ORGANIZER VARCHAR(100) NOT NULL,
    CAPTION TEXT NOT NULL,
    TARGET_FUNDING DECIMAL(15, 2) NOT NULL,
    CURRENT_FUNDING DECIMAL(15, 2) NOT NULL,
    CITY VARCHAR(50),
    ACTIVE BOOLEAN NOT NULL,
    CATEGORY_ID INT,
    FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORY(CATEGORY_ID)
);

CREATE TABLE DONATION (
    DONATION_ID INT PRIMARY KEY AUTO_INCREMENT,
    `DATE` DATE NOT NULL,
    AMOUNT DECIMAL(15, 2) NOT NULL,
    GIVER VARCHAR(50),
    FUNDRAISER_ID INT,
    FOREIGN KEY (FUNDRAISER_ID) REFERENCES FUNDRAISER(FUNDRAISER_ID)
);

INSERT INTO CATEGORY (CATEGORY_ID, NAME)
VALUES
(1, 'Health'),
(2, 'Education'),
(3, 'Environment'),
(4, 'Medical'),
(5, 'Social Impact');

INSERT INTO FUNDRAISER (FUNDRAISER_ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID)
VALUES
(1, 'Mark Thompson', 'Provide medical aid to remote villages.', 60000.00, 30000.00, 'Seattle', TRUE, 1),
(2, 'Sarah Lee', 'Sponsor educational workshops for young women.', 25000.00, 18000.00, 'Boston', TRUE, 2),
(3, 'Earth Savers', 'Reduce plastic waste by installing recycling bins.', 80000.00, 50000.00, 'Austin', TRUE, 3),
(4, 'Alex Green', 'Support research on renewable energy solutions.', 120000.00, 90000.00, 'Denver', TRUE, 4),
(5, 'Linda White', 'Fund the construction of a new community library.', 100000.00, 85000.00, 'Miami', TRUE, 5),
(6, 'David Smith', 'Rebuild homes for wildfire victims.', 40000.00, 25000.00, 'Sacramento', TRUE, 5),
(7, 'Olivia Martinez', 'Support local artists with a community gallery.', 50000.00, 30000.00, 'San Diego', TRUE, 4),
(8, 'Daniel Kim', 'Provide scholarships for underprivileged students.', 45000.00, 35000.00, 'New York', TRUE, 3),
(9, 'Ava Wilson', 'Create a public park in an urban neighborhood.', 70000.00, 50000.00, 'Atlanta', TRUE, 2),
(10, 'James Taylor', 'Develop a wildlife conservation program.', 150000.00, 110000.00, 'Orlando', TRUE, 1);

INSERT INTO DONATION (DONATION_ID, `DATE`, AMOUNT, GIVER, FUNDRAISER_ID)
VALUES
(1, '2024-10-01', 500.00, 'Emily Clark', 1),
(2, '2024-10-03', 1000.00, 'John Doe', 2),
(3, '2024-10-05', 250.00, 'Sophia Miller', 3),
(4, '2024-10-07', 750.00, 'James Brown', 4),
(5, '2024-10-09', 300.00, 'Linda Harris', 5),
(6, '2024-10-10', 600.00, 'Michael Davis', 1),
(7, '2024-10-12', 1200.00, 'Sarah Wilson', 2),
(8, '2024-10-14', 450.00, 'David White', 3),
(9, '2024-10-15', 700.00, 'Olivia Thompson', 4),
(10, '2024-10-16', 550.00, 'Chris Johnson', 5);

