const express = require("express");

const { addRestaurant } = require("../controllers/restaurant");

const restaurantRouter = express.Router();

restaurantRouter.post("/add", addRestaurant);

module.exports = restaurantRouter;


// !  /restaurant/add