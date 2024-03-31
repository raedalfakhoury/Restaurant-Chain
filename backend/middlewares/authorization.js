const authorization = (text) => {
    return (req, res, next) => {
      if (!req.token.role.permissions.includes(text)) {
        res.status(403).json({
          success: false,
          massage: "Unauthorized",
        });
      } else {
        next();
      }
    };
  };
  module.exports = authorization;
  