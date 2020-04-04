'use strict';
const config = require('../../config/environment');

module.exports = (sequelize, Sequelize) => {
    const Sale = sequelize.define('Sale', {
        name: Sequelize.STRING
    }, {
    	freezeTableName: true

    });

    Sale.associate = function (models) {
    	Sale.hasMany(models.Product, {as: 'products'})
    };

    return Sale;
};