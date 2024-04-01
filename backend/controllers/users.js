const pool = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = parseInt(process.env.SALT);
 
const register = async (req, res) => {
  const { first_name, last_name, email, password } =
    req.body; 
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const query = `INSERT INTO users (first_name, last_name, email, password) VALUES ($1,$2,$3,$4)`;
  const data = [
    first_name,
    last_name, 
    email.toLowerCase(),
    encryptedPassword
  ];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Account created successfully",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
        err,
      });
    });
};

const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const query = `SELECT * FROM users WHERE email = $1`;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
     
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              userId: result.rows[0].user_id,
              // role:result.rows[0].role_id,
              // permissions: result.rows[0].role_id,
              role: {
                role:
                result.rows[0].role_id == "2" ? "Admin" : "User",
                permissions:
                result.rows[0].role_id == "2"
                    ? [
                        "manage"
                      ]
                    : [
                        "view"
                      ],
              },
              
            };
            const options = { expiresIn: "1d" };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);
            if (token) {
              return res.status(200).json({
                token,
                success: true,
                message: `Valid login credentials`,
                role:result.rows[0].role_id == 2 ? "Admin" : "User",
                permissions: result.rows[0].role_id  == 2 ? ["manage"] : ["view"]
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `The email doesn’t exist or the password you’ve entered is incorrect`,
            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
        err,
      });
    });
};

module.exports = {
  register,
  login,
};
