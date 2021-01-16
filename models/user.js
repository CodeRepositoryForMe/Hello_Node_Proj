const sequelize = require("sequelize");

const sequelizeObj = require("../util/database");

const User = sequelizeObj.define('User',{
  id: {
    type: sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
