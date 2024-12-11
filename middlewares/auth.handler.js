const boom = require('@hapi/boom');

const { config } = require('../config/config');
const { ne } = require('faker/lib/locales');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkAdminrole(req, res, next) {
  console.log(req.user);
  const user = req.user;

  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checknrole(...roles) {
  return (req, res, next) => {
    console.log(req.user);
    const user = req.user;

    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}
module.exports = { checkApiKey, checkAdminrole, checknrole };
