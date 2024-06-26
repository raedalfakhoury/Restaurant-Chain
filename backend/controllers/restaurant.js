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
  const {
    restaurant_name,
    Phone,
    Street_name,
    start_time,
    end_time,
    nearby_landmarks,
    restaurant_id,
  } = req.body;

  const query = `UPDATE restaurant
  SET 
      restaurant_name = COALESCE($1, restaurant_name),
      Phone = COALESCE($2, Phone),
      Street_name = COALESCE($3, Street_name),
      start_time = COALESCE($4, start_time),
      end_time = COALESCE($5, end_time),
      nearby_landmarks = COALESCE($6, nearby_landmarks)
  WHERE 
      restaurant_id = COALESCE($7, restaurant_id);
  `;
  const data = [
    restaurant_name || null,
    Phone || null,
    Street_name || null,
    start_time || null,
    end_time || null,
    nearby_landmarks || null,
    restaurant_id || null,
  ];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "restaurant updated successfully",
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
const deleteRestaurant = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE restaurant
    SET is_deleted = 1
    WHERE restaurant_id = $1;`;
  const data = [id];
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
  const { item, description, price, image, start_time, end_time } = req.body;

  const query = `INSERT INTO menu (item, description,price,image ,start_time , end_time) VALUES ($1,$2,$3,$4,$5,$6)`;
  const data = [item, description, price, image, start_time, end_time];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "menu created successfully",
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
// ! to edit menu information
const editmenutInfo = (req, res) => {
  const { item, description, price, serving_time, menu_id } = req.body;

  const query = `UPDATE menu
    SET item = $1 , description = $2 , price = $3 , serving_time = $4  
    WHERE menu_id = $5;`;
  const data = [item, description, price, serving_time, menu_id];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "menu updated successfully",
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
// ! to delete menu item(soft delete)
const deleteMenuItem = (req, res) => {
  const { menu_id } = req.body;

  const query = `UPDATE menu
    SET is_deleted = 1  
    WHERE menu_id = $1;`;
  const data = [menu_id];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "menu deleted successfully",
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
        message: "Added Successfully",
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
  const query = `SELECT * FROM restaurant WHERE is_deleted = 0`;

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
//! to get all menu
const getMenu = (req, res) => {
  const query = `SELECT * FROM menu WHERE is_delete = 0`;

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
  const { restaurant_id } = req.params;
  const query = `SELECT * FROM restaurant WHERE restaurant_id = $1`;

  pool
    .query(query, [restaurant_id])
    .then((result) => {
      if (result.rowCount) {
        res.status(200).json({
          success: true,
          message: "branch getting successfully",
          result: result.rows[0],
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
 menu.item,
 menu.description,
 menu.price,
 menu.start_time,
 menu.end_time,
  FROM
  restaurant_menu 
  JOIN
  restaurant ON restaurant_menu.restaurant_id = restaurant.restaurant_id
  
  JOIN
  menu ON restaurant_menu.menu_id = menu.menu_id

   WHERE restaurant.restaurant_id = $1 ;
    
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
const maintenance = (req, res) => {
  const {
    start_maintenance_date,
    end_maintenance_date,
    Labour_Number,
    Labor_Rate_Per_day,
    material_cost,
    comments,
    impact,
    restaurant_id,
  } = req.body;

  const query = `INSERT INTO maintenance ( start_maintenance_date,
    end_maintenance_date, Labour_Number, Labor_Rate_Per_day, material_cost,comments,impact,restaurant_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`;
  const data = [
    start_maintenance_date,
    end_maintenance_date,
    Labour_Number,
    Labor_Rate_Per_day,
    material_cost,
    comments,
    impact,
    restaurant_id,
  ];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "maintenance created successfully",
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
//! to edit maintenance form
const editMaintenance = (req, res) => {
  const {
    maintenance_date,
    Labour_Number,
    Labor_Rate_Per_day,
    material_cost,
    impact,
    comments,
    restaurant_id,
    maintenance_id,
  } = req.body;

  const query = `UPDATE maintenance
  SET maintenance_date = $1 , Labour_Number = $2 , Labor_Rate_Per_day = $3 , material_cost = $4 ,  impact = $5 , comments = $6 , restaurant_id = $7  
  WHERE maintenance_id = $8;`;
  const data = [
    maintenance_date,
    Labour_Number,
    Labor_Rate_Per_day,
    material_cost,
    impact,
    comments,
    restaurant_id,
    maintenance_id,
  ];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "maintenance updated successfully",
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
  const query = `
  SELECT
    restaurant.restaurant_id,
    restaurant.restaurant_name,
    restaurant.phone,
    restaurant.street_name,
    restaurant.start_time,
    restaurant.end_time,
    restaurant.nearby_landmarks,
    maintenance.start_maintenance_date,
    maintenance.end_maintenance_date,
    maintenance.Labour_Number,
    maintenance.Labor_Rate_Per_day,
    maintenance.material_cost,
    maintenance.impact,
    maintenance.comments,
    (  maintenance.end_maintenance_date - maintenance.start_maintenance_date) AS maintenance_duration,
    (  (maintenance.end_maintenance_date - maintenance.start_maintenance_date) * maintenance.Labour_Number * maintenance.Labor_Rate_Per_day + maintenance.material_cost) AS cost
FROM
    maintenance
JOIN
    restaurant ON maintenance.restaurant_id = restaurant.restaurant_id
WHERE restaurant.is_deleted = 0
      
    `;
  pool
    .query(query)
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

//! to get all information about restaurant , menu and maintenance
const details = (req, res) => {
  const query = `SELECT DISTINCT ON (r.restaurant_id)
  r.restaurant_id,
  r.restaurant_Name,
  r.Phone,
  r.Street_name,
  r.start_time AS restaurant_start_time,
  r.end_time AS restaurant_end_time,
  r.nearby_landmarks, 
  COALESCE(mt.impact, 'NONE') AS maintenance_impact
FROM
  restaurant r
LEFT JOIN
  maintenance mt ON r.restaurant_id = mt.restaurant_id  
WHERE
  r.is_deleted = 0
ORDER BY
  r.restaurant_id, mt.start_maintenance_date DESC;




    `;
  pool
    .query(query)
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
//! to get all information about restaurant and menu
const getMenuByRestaurantId = (req, res) => {
  const { id } = req.params;
  const query = `
  
  SELECT DISTINCT
  m.item,
  m.description,
  m.price,
  m.image AS menu_image,
  m.start_time AS start_time,
  m.end_time AS end_time
FROM
  restaurant r
JOIN
  restaurant_menu rm ON r.restaurant_id = rm.restaurant_id
JOIN
  menu m ON rm.menu_id = m.menu_id
WHERE
  r.restaurant_id = $1;

    `;
  const data = [id];
  pool
    .query(query, data)
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
  getMenu,
  restaurant_menu,
  getAllRestaurantbranch,
  getAllRestaurantbranchById,
  getItemByResBranchId,
  maintenance,
  maintenance_restaurant,
  editRestaurantInfo,
  deleteRestaurant,
  editmenutInfo,
  deleteMenuItem,
  editMaintenance,
  details,
  getMenuByRestaurantId,
};
