require('dotenv').config();
const {Pool} = require('pg');

const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${config.dbUser}:${config.dbPassword}@localhost:${config.dbPort}/${config.dbName}`;



const pool = new Pool({ connectionString: URI });
module.exports = pool;