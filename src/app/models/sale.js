"use strict";
const config = require("../../config/environment");

module.exports = (sequelize, Sequelize) => {
  const Sale = sequelize.define("Sale", {
    name: Sequelize.STRING,
  });

  Sale.associate = function (models) {
    Sale.hasMany(models.Product, { foreignKey: "saleId" });
  };

  return Sale;
};
