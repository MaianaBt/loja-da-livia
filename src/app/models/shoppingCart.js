'use strict';
const config = require('../../config/environment');

module.exports = (sequelize, Sequelize) => {
    const ShoppingCart = sequelize.define('ShoppingCart', {
        amount: Sequelize.FLOAT
    }, {
    	freezeTableName: true

    });

    ShoppingCart.associate = function (models) {
        ShoppingCart.belongsToMany(models.Product, {through: 'ShoppingCartProduct', foreignKey: 'cartId'})
    };

    return ShoppingCart;
};