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

 
CREATE TABLE restaurant (
  restaurant_id SERIAL PRIMARY KEY,
  restaurant_Name VARCHAR(255) NOT NULL,
  Phone VARCHAR(255) NOT NULL,
  Street_name VARCHAR(255) NOT NULL,
  start_time VARCHAR(255) DEFAULT '8:00 AM' NOT NULL,
  end_time VARCHAR(255) DEFAULT '5:30 PM' NOT NULL,
  nearby_landmarks VARCHAR(255) UNIQUE NOT NULL,
  is_deleted INT DEFAULT 0
);

 
CREATE TABLE menu (
  menu_id SERIAL PRIMARY KEY,
  item VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price DOUBLE PRECISION NOT NULL,
  image VARCHAR(255) DEFAULT 'https://img.freepik.com/free-photo/vegetables-salad-table_23-2148515515.jpg?w=740&t=st=1712504843~exp=1712505443~hmac=f5e2b14446e3ae32d3df8cb761650242668ac0f9888c7d779ffb8e143d6fc07a',
  start_time VARCHAR(255) DEFAULT '8:00 AM' NOT NULL,
  end_time VARCHAR(255) DEFAULT '5:30 PM' NOT NULL,
  is_delete INT DEFAULT 0
); 

CREATE TABLE restaurant_menu (
  restaurant_menu_id SERIAL PRIMARY KEY,
  restaurant_id INT,
  menu_id INT,
  FOREIGN KEY (restaurant_id) REFERENCES restaurant (restaurant_id),
  FOREIGN KEY (menu_id) REFERENCES menu (menu_id)
);
 
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
  is_delete INT DEFAULT 0,
  FOREIGN KEY (restaurant_id) REFERENCES restaurant (restaurant_id)
);