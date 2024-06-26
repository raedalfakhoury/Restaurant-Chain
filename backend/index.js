const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");
 
//  create server
const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());
 //import user Routers
const usersRouter = require('./routes/users')
const restaurantRouter = require('./routes/restaurant')


// Routers
app.use("/user", usersRouter);
app.use("/restaurant", restaurantRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
