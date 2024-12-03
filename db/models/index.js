// db/models/index.js
const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  // Establecer asociaciones de modelos
  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
}

module.exports = setupModels;
