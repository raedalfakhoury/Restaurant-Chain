const pool = require("../models/db");
 
const addRestaurant = async (req, res) => {
  const { restaurant_Name, Phone, Street_name } =
    req.body; 
  
  const query = `INSERT INTO restaurant (restaurant_Name, Phone, Street_name) VALUES ($1,$2,$3)`;
  const data = [
    restaurant_Name,
    Phone, 
    Street_name
  ];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "restaurant created successfully",
        result
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
 

module.exports = {
    addRestaurant, 
};
