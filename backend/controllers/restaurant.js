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
const restaurant_menu = async (req, res) => {
    const { restaurant_id, menu_id  } =
      req.body; 
    
    const query = `INSERT INTO restaurant_menu (restaurant_id, menu_id) VALUES ($1,$2)`;
    const data = [
        restaurant_id,
      menu_id
    ];
    pool
      .query(query, data)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: " created successfully",
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


const getAllRestaurantbranch =  (req,res) => {
    
    const query = `SELECT * FROM restaurant `;
    
    pool
      .query(query)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "successfully",
          result:result.rows
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(409).json({
          success: false,
          message: "Server Error",
          err,
        });
      });
  };
const getAllRestaurantbranchById =  (req,res) => {
    const {id} = req.params;
    const query = `SELECT * FROM restaurant WHERE restaurant_id = $1`;
    
    pool
      .query(query,[id])
      .then((result) => {
        if (result.rowCount) {
            res.status(200).json({
          success: true,
          message: "branch getting successfully",
          result:result.rows
        });
        }else{
            throw Error
        }
        
      })
      .catch((err) => {
        console.log(err);
        res.status(409).json({
          success: false,
          message: "Server Error",
          err,
        });
      });
  };
 
 
module.exports = {
    addRestaurant ,
    menu,
    restaurant_menu,
    getAllRestaurantbranch,
    getAllRestaurantbranchById
};
