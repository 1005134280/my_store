const { User, UserSchema } = require('./user.model');
const { Customer, CustumerSchema } = require('./customer.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustumerSchema, Customer.config(sequelize));
  
}

module.exports = setupModels;