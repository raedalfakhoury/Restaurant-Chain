const express = require("express");

const {
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
  details
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
  "/branch/editres",
  authentication,
  authorization("manage"),
  editRestaurantInfo
);
restaurantRouter.put(
  "/restaurantBranch/delete/:id", 
  deleteRestaurant
);
restaurantRouter.post("/item",
 authentication, authorization("manage"), 
 menu);

 restaurantRouter.get(
  "/allmenu",
  authentication,
  authorization("manage"),
  getMenu
);

 restaurantRouter.get(
  "/details", 
  details
);


restaurantRouter.put(
  "/item/edit",
  authentication,
  authorization("manage"),
  editmenutInfo
);

restaurantRouter.put(
  "/item/delete",
  authentication,
  authorization("manage"),
  deleteMenuItem
);

restaurantRouter.post(
  "/menu",
  authentication,
  authorization("manage"),
  restaurant_menu
);
restaurantRouter.post(
  "/maintenance/",
  authentication,
  authorization("manage"),
  maintenance
);
restaurantRouter.put(
  "/maintenance/edit",
  authentication,
  authorization("manage"),
  editMaintenance
);
restaurantRouter.get(
  "/maintenance_res/",
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
  "/branch/:restaurant_id",
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
