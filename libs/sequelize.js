const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${config.dbUser}:${config.dbPassword}@localhost:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  // se tiene que agregar una varible que lo que hace es decir en que bd estamos trabajando

  dialect: 'mysql',
  logging: false,
});

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;


