'use strict';
const config = require('../../config/environment');

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('Product', {
        name: Sequelize.STRING,
        price: Sequelize.FLOAT,
        description: Sequelize.STRING,
        saleId: Sequelize.INTEGER
    }, {
        freezeTableName: true
    });

    Product.associate = function (models) {
        Product.belongsTo(models.Sale, {foreignKey: 'saleId', as: 'sale'}),
        Product.belongsToMany(models.Product, {through: 'ShoppingCartProduct', foreignKey: 'productId', as: 'productId' })
    };

    return Product;
};