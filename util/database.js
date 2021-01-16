//const mysql = require("mysql2");
const dotenv = require("dotenv");
const sequelize = require("sequelize");

//const { sequelize } = require("sequelize");

dotenv.config();

//// Traditional MySQL connection

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PWD
// });

// module.exports = pool.promise();

//// Changs for sequelize

const sequelizeObj = new sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  { dialect: process.env.DB_SERVER, host: process.env.DB_HOST }
);

module.exports = sequelizeObj;
