const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${config.dbUser}:${config.dbPassword}@localhost:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  // se tiene que agregar una varible que lo que hace es decir en que bd estamos trabajando

  dialect: 'postgres',
  logging: false,
});

setupModels(sequelize);


module.exports = sequelize;


