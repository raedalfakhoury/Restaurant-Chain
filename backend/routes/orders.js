const express = require("express");

const { addOrders,getOrders ,deleteItem,getAllOrders}  = require("../controllers/orders")
const authentication = require("../middlewares/authentication");

const orderRouter = express.Router();

orderRouter.post("/add",authentication, addOrders); 
orderRouter.get("/",authentication, getOrders); 
orderRouter.get("/all", getAllOrders); 
orderRouter.delete("/delete/:id",authentication, deleteItem); 

module.exports = orderRouter;

 