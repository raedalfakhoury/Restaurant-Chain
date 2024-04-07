-- Table: Roles
CREATE TABLE Roles (
    role_id SERIAL PRIMARY KEY,
    role VARCHAR(255) NOT NULL
);


-- Create a table called users in the database
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY, 
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
	restaurant_Name  VARCHAR(255) NOT NULL,
  Phone  VARCHAR(255) NOT NULL, 
  Street_name VARCHAR(255)  NOT NULL,
  start_time  VARCHAR(255) DEFAULT '8:00 AM' NOT NULL,
  end_time  VARCHAR(255) DEFAULT '5:30 PM' NOT NULL, 
  nearby_landmarks VARCHAR(255) UNIQUE NOT NULL,
  is_deleted INT DEFAULT 0

);
 -- Create a table menu
CREATE TABLE menu (
  menu_id SERIAL PRIMARY KEY,
  item  VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price DOUBLE PRECISION NOT NULL,
 start_time  VARCHAR(255) DEFAULT '8:00 AM' NOT NULL,
  end_time  VARCHAR(255) DEFAULT '5:30 PM' NOT NULL, 
  is_delete INT DEFAULT 0
);

 -- Create a table restaurant_menu
CREATE TABLE restaurant_menu (
  restaurant_menu_id SERIAL PRIMARY KEY,
  restaurant_id INT ,
  menu_id INT , 
  FOREIGN KEY (restaurant_id) REFERENCES restaurant (restaurant_id),
  FOREIGN KEY (menu_id) REFERENCES menu (menu_id)
);
 -- Create a table maintenance 
CREATE TABLE maintenance (
  maintenance_id SERIAL PRIMARY KEY,
  start_maintenance_date DATE NOT NULL,
  end_maintenance_date DATE NOT NULL,
  Labour_Number INT NOT NULL,
  Labor_Rate_Per_day INT NOT NULL,
  material_cost DOUBLE PRECISION DEFAULT 0,
  comments VARCHAR(255) DEFAULT 'NONE', 
  restaurant_id INT,
  impact VARCHAR(255) DEFAULT 'NONE',
  is_delete INT DEFAULT 0
  FOREIGN KEY (restaurant_id) REFERENCES restaurant (restaurant_id) 
);

