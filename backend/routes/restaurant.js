const express = require("express");

const { addRestaurant } = require("../controllers/restaurant");
const authorization = require("../middlewares/authorization"); 
const authentication = require("../middlewares/authentication"); 
const restaurantRouter = express.Router();

restaurantRouter.post("/add",authentication,authorization("manage") ,addRestaurant);

module.exports = restaurantRouter;


// !  /restaurant/add