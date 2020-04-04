'use strict';
const config = require('../../config/environment');

module.exports = (sequelize, Sequelize) => {
    const ShoppingCartProduct = sequelize.define('ShoppingCartProduct', {
        quantity: Sequelize.INTEGER,
        cartId: Sequelize.INTEGER,
        productId: Sequelize.INTEGER
    }, {
        freezeTableName: true

    });

    ShoppingCartProduct.associate = function (models) {
        ShoppingCartProduct.belongsTo(models.Product, {foreignKey: 'productId'})
    	ShoppingCartProduct.belongsTo(models.ShoppingCart, {foreignKey: 'cartId'})
    };

    return ShoppingCartProduct;
};