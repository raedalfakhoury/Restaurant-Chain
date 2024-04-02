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

  

 -- Create a table resturant
CREATE TABLE restaurant (
  restaurant_id SERIAL PRIMARY KEY,
	restaurant_Name  VARCHAR(255) ,
  Phone  VARCHAR(255) , 
  Street_name VARCHAR(255) ,
  start_time  VARCHAR(255) ,
  end_time  VARCHAR(255) , 
  nearby_landmarks VARCHAR(255) ,
  active INT DEFAULT 0
);
 -- Create a table menu
CREATE TABLE menu (
  menu_id SERIAL PRIMARY KEY,
  item  VARCHAR(255) ,
  description VARCHAR(255) ,
  price DOUBLE PRECISION ,
  serving_time VARCHAR(255) 
);

 -- Create a table restaurant_menu
CREATE TABLE restaurant_menu (
  restaurant_menu_id SERIAL PRIMARY KEY,
  restaurant_id INT ,
  menu_id INT , 
  FOREIGN KEY (restaurant_id) REFERENCES restaurant (restaurant_id),
  FOREIGN KEY (menu_id) REFERENCES menu (menu_id)
);