const express = require("express");

const { getProducts ,addProducts}  = require("../controllers/products")

const productRouter = express.Router();

productRouter.post("/add", addProducts); 
productRouter.get("/", getProducts); 

module.exports = productRouter;

 
 