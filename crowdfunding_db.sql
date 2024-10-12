CREATE TABLE CATEGORY (
    CATEGORY_ID INT PRIMARY KEY,
    NAME VARCHAR(50) NOT NULL
);


CREATE TABLE FUNDRAISER (
    FUNDRAISER_ID INT PRIMARY KEY,
    ORGANIZER VARCHAR(100) NOT NULL,
    CAPTION TEXT NOT NULL,
    TARGET_FUNDING DECIMAL(15, 2) NOT NULL,
    CURRENT_FUNDING DECIMAL(15, 2) NOT NULL,
    CITY VARCHAR(50),
    ACTIVE BOOLEAN NOT NULL,
    CATEGORY_ID INT,
    FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORY(CATEGORY_ID)
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
(5, 'Linda White', 'Fund the construction of a new community library.', 100000.00, 85000.00, 'Miami', TRUE, 5);