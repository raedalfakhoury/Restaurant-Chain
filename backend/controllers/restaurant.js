const pool = require("../models/db");
// ! to add new branch
const addRestaurant = async (req, res) => {
  const {
    restaurant_Name,
    Phone,
    Street_name,
    start_time,
    end_time,
    nearby_landmarks,
  } = req.body;

  const query = `INSERT INTO restaurant (restaurant_Name, Phone, Street_name,start_time,end_time,nearby_landmarks) VALUES ($1,$2,$3,$4,$5,$6)`;
  const data = [
    restaurant_Name,
    Phone,
    Street_name,
    start_time,
    end_time,
    nearby_landmarks,
  ];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "restaurant created successfully",
        result: result.rows[0],
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
// ! to edit branch information
const editRestaurantInfo = async (req, res) => {
    const {id} = req.params;
    const {
      restaurant_Name,
      Phone,
      Street_name,
      start_time,
      end_time,
      nearby_landmarks,
      active,
      is_deleted
    } = req.body;
  
    const query = `UPDATE restaurant
    SET restaurant_Name = $1 , Phone = $2 , Street_name = $3 , start_time = $4 ,  end_time = $5 , nearby_landmarks = $6 , active = $7 , is_deleted = $8
    WHERE restaurant_id = $9;`;
    const data = [
      restaurant_Name,
      Phone,
      Street_name,
      start_time,
      end_time,
      nearby_landmarks,
      active,
      is_deleted,
      id
    ];
    pool
      .query(query, data)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "restaurant updated successfully",
          result:result.rows
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server",
          err,
        });
      });
  };

// ! to DELETE branch information (soft delete)
const deleteRestaurant = async (req, res) => {
    const {id} = req.params;
    const { 
      is_deleted
    } = req.body;
  
    const query = `UPDATE restaurant
    SET is_deleted = $1
    WHERE restaurant_id = $2;`;
    const data = [ 
      is_deleted,
      id
    ];
    pool
      .query(query, data)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "restaurant deleted successfully",
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server",
          err,
        });
      });
  };

//! to add new item in menu
const menu = async (req, res) => {
  const { item, description, price, serving_time } = req.body;

  const query = `INSERT INTO menu (item, description,price,serving_time) VALUES ($1,$2,$3,$4)`;
  const data = [item, description, price, serving_time];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "menu created successfully",
        result: result.rows[0],
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
//! to bind restaurant with menu
const restaurant_menu = async (req, res) => {
  const { restaurant_id, menu_id } = req.body;

  const query = `INSERT INTO restaurant_menu (restaurant_id, menu_id) VALUES ($1,$2)`;
  const data = [restaurant_id, menu_id];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: " created successfully",
        result: result.rows[0],
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
//! to get all restaurant branch
const getAllRestaurantbranch = (req, res) => {
  const query = `SELECT * FROM restaurant `;

  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "successfully",
        result: result.rows,
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
//! to get restaurant branch by id
const getAllRestaurantbranchById = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM restaurant WHERE restaurant_id = $1`;

  pool
    .query(query, [id])
    .then((result) => {
      if (result.rowCount) {
        res.status(200).json({
          success: true,
          message: "branch getting successfully",
          result: result.rows,
        });
      } else {
        throw Error;
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
//! to get all information about restaurant 
const getItemByResBranchId = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT DISTINCT
    restaurant.restaurant_id,
    menu.menu_id,
    restaurant.restaurant_name,
    restaurant.phone,
    restaurant.street_name,
    restaurant.start_time,
    restaurant.end_time,
    restaurant.nearby_landmarks,
    restaurant.active,
   menu.item,
   menu.description,
   menu.price,
   menu.serving_time
    FROM
    restaurant_menu 
    JOIN
    restaurant ON restaurant_menu.restaurant_id = restaurant.restaurant_id
    
    JOIN
    menu ON restaurant_menu.menu_id = menu.menu_id

     WHERE restaurant.restaurant_id = $1
    
  `;
  pool
    .query(query, [id])
    .then((result) => {
      if (result.rowCount) {
        res.status(200).json({
          success: true,
          message: "branch getting successfully",
          result: result.rows,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Please Add Menu",
        });
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
//! to fill maintenance form 
const maintenance = async (req, res) => {
  const {
    maintenance_date,
    Labour_Number,
    Labor_Rate_Per_day,
    material_cost,
    impact,
    comments,
    restaurant_id,
  } = req.body;

  const query = `INSERT INTO maintenance (maintenance_date, Labour_Number, Labor_Rate_Per_day,material_cost,impact,comments,restaurant_id) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
  const data = [
    maintenance_date,
    Labour_Number,
    Labor_Rate_Per_day,
    material_cost,
    impact,
    comments,
    restaurant_id,
  ];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "maintenance created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err,
      });
    });
};
//! to get all information about restaurant and maintenance 
const maintenance_restaurant = (req, res) => {
  const { id } = req.params;
  const query = `
      SELECT DISTINCT
      restaurant.restaurant_id,
      restaurant.restaurant_name,
      restaurant.phone,
      restaurant.street_name,
      restaurant.start_time,
      restaurant.end_time,
      restaurant.nearby_landmarks,
      restaurant.active,
      maintenance.maintenance_date,
      maintenance.Labour_Number,
      maintenance.Labor_Rate_Per_day,
      maintenance.material_cost,
      maintenance.impact,
      maintenance.comments
      FROM
      maintenance 
      JOIN
      restaurant ON maintenance.restaurant_id = restaurant.restaurant_id
  
       WHERE restaurant.restaurant_id = $1
      
    `;
  pool
    .query(query, [id])
    .then((result) => {
    
        res.status(200).json({
          success: true,
          message: "getting successfully",
          result: result.rows,
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

module.exports = {
  addRestaurant,
  menu,
  restaurant_menu,
  getAllRestaurantbranch,
  getAllRestaurantbranchById,
  getItemByResBranchId,
  maintenance,
  maintenance_restaurant,
  editRestaurantInfo,
  deleteRestaurant
};
