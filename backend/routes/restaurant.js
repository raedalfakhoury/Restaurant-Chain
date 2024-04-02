const express = require("express");

const {
  addRestaurant,
  menu,
  restaurant_menu,
  getAllRestaurantbranch,
  getAllRestaurantbranchById,
  getItemByResBranchId,
  maintenance,
  maintenance_restaurant,
  editRestaurantInfo,
  deleteRestaurant,
  editmenutInfo
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
restaurantRouter.put(
  "/branch/edit/:id",
  authentication,
  authorization("manage"),
  editRestaurantInfo
);
restaurantRouter.put(
  "/branch/delete/:id",
  authentication,
  authorization("manage"),
  deleteRestaurant
);
restaurantRouter.post("/item", authentication, authorization("manage"), menu);
restaurantRouter.put("/item/edit", authentication, authorization("manage"), editmenutInfo);
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
  "/maintenance_res/:id",
  authentication,
  authorization("manage"),
  maintenance_restaurant
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
