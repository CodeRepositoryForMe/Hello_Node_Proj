const sequelize = require('sequelize');

const sequelizeObj = require("../util/database");

const OrderItem = sequelizeObj.define('orderItem',{
    id: {
        type: sequelize.STRING,
        allowNull : false,
        primaryKey : true
    },
    quantity : {
        type: sequelize.INTEGER, 
        allowNull : false
    }
});

module.exports = OrderItem;