const sequelize = require("sequelize");

const sequelizeObj = require("../util/database");

const Order = sequelizeObj.define("order", {
  id: {
    type: sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Order;