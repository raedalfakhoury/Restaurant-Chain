-- Table: Roles
CREATE TABLE Roles (
    role_id SERIAL PRIMARY KEY,
    role VARCHAR(255) NOT NULL
);


-- Create a table called users in the database
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) ,
  last_name VARCHAR(255) UNIQUE, 
  email VARCHAR(255) UNIQUE,
  role_id INT DEFAULT 1,
  password VARCHAR(255),
  FOREIGN KEY (role_id) REFERENCES Roles (role_id)
);

-- Create permissions
CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  permission VARCHAR(255)
);

 