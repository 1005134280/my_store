// db/models/index.js
const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema }=require('./category.model');
const { Product , ProductSchema } = require('./product.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));

  // Establecer asociaciones de modelos
  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
}

module.exports = setupModels;
