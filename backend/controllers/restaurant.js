const pool = require("../models/db");
 
const addRestaurant = async (req, res) => {
  const { restaurant_Name, Phone, Street_name,start_time,end_time,nearby_landmarks } =
    req.body; 
  
  const query = `INSERT INTO restaurant (restaurant_Name, Phone, Street_name,start_time,end_time,nearby_landmarks) VALUES ($1,$2,$3,$4,$5,$6)`;
  const data = [
    restaurant_Name,
    Phone, 
    Street_name,
    start_time,
    end_time,
    nearby_landmarks
  ];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "restaurant created successfully",
        result:result.rows[0]
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The restaurant already exists",
        err,
      });
    });
};
const menu = async (req, res) => {
  const { item, description ,price } =
    req.body; 
  
  const query = `INSERT INTO menu (item, description,price) VALUES ($1,$2,$3)`;
  const data = [
    item,
    description,
    price
  ];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "menu created successfully",
        result:result.rows[0]
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "Server Error",
        err,
      });
    });
};

 
 
module.exports = {
    addRestaurant ,
    menu
};
