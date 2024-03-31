const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

//routers
 const usersRouter = require("./routes/users");
 
const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());
 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
