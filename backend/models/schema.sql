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
  password VARCHAR(255),
  role_id INT DEFAULT 1,
  FOREIGN KEY (role_id) REFERENCES Roles (role_id)
);

-- Create permissions
CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  permission VARCHAR(255)
);

 -- Create a table openingHours
CREATE TABLE openingHours (
  id SERIAL PRIMARY KEY,
	start_time  VARCHAR(255) ,
  end_time  VARCHAR(255) , 
  Street_name VARCHAR(255) ,
  restaurant_Name VARCHAR(255) ,
  FOREIGN KEY (restaurant_Name) REFERENCES restaurant (restaurant_Name)
);

 -- Create a table resturant
CREATE TABLE restaurant (
  restaurant_id SERIAL PRIMARY KEY,
	restaurant_Name  VARCHAR(255) UNIQUE,
  Phone  VARCHAR(255) UNIQUE, 
  Street_name VARCHAR(255) ,
  active INT DEFAULT 0
);