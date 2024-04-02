const express = require("express");

const {
  addRestaurant,
  menu,
  restaurant_menu,
  getAllRestaurantbranch,
  getAllRestaurantbranchById,
  getItemByResBranchId,
  maintenance
} = require("../controllers/restaurant");
const authorization = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");
const restaurantRouter = express.Router();

restaurantRouter.post(
  "/add",
  authentication,
  authorization("manage"),
  addRestaurant
);
restaurantRouter.post("/item", authentication, authorization("manage"), menu);
restaurantRouter.post(
  "/menu",
  authentication,
  authorization("manage"),
  restaurant_menu
);
restaurantRouter.post(
  "/maintenance",
  authentication,
  authorization("manage"),
  maintenance
);
restaurantRouter.get(
  "/",
  authentication,
  authorization("view"),
  getAllRestaurantbranch
);
restaurantRouter.get(
  "/branch/:id",
  authentication,
  authorization("view"),
  getAllRestaurantbranchById
);
restaurantRouter.get(
  "/branch_item/:id",
  authentication,
  authorization("view"),
  getItemByResBranchId
);

module.exports = restaurantRouter;

// !  /restaurant/add
