const sequelize = require('sequelize');

const sequelizeObj = require("../util/database");

const CartItem = sequelizeObj.define('cartItem',{
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

module.exports = CartItem;