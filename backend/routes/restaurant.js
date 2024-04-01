const express = require("express");

const { addRestaurant,menu } = require("../controllers/restaurant");
const authorization = require("../middlewares/authorization"); 
const authentication = require("../middlewares/authentication"); 
const restaurantRouter = express.Router();

restaurantRouter.post("/add",authentication,authorization("manage") ,addRestaurant); 
restaurantRouter.post("/menu",authentication,authorization("manage") ,menu); 

module.exports = restaurantRouter;


// !  /restaurant/add