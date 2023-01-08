const statusCode = require('http-status');

const auth = (req, res, next) => {
  if(!req.session.user){
    return res.status(401).json({
      status: false,
      message: `${statusCode[401]}: No autorizado`
    });
  }
  next();
}

module.exports = auth;