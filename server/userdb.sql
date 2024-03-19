CREATE DATABASE IF NOT EXISTS userdb;

USE userdb;

CREATE TABLE IF NOT EXISTS userdb.users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    address VARCHAR(255),
    country VARCHAR(50),
    phone VARCHAR(20)
);

SELECT * from userdb.users;


-- DELETE FROM userdb.users;
-- SET @new_id = 0;
-- UPDATE userdb.users SET id = @new_id:=@new_id + 1;

-- ALTER TABLE userdb.users AUTO_INCREMENT = 1;
-- DELETE FROM userdb.users where id=10;




USE userdb;

CREATE TABLE locationdb (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 6) NOT NULL,
  longitude DECIMAL(10, 6) NOT NULL,
  timestamp DATETIME NOT NULL
);

SELECT * from userdb.locationdb;



-- DELETE FROM userdb.locationdb;

-- SET @new_id = 0;
-- UPDATE userdb.locationdb SET id = @new_id:=@new_id + 1;

-- ALTER TABLE userdb.locationdb AUTO_INCREMENT = 1;

-- DELETE FROM userdb.locationdb
-- ORDER BY id
-- LIMIT 1;
