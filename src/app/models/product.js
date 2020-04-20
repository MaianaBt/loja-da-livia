"use strict";
const config = require("../../config/environment");

module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("Product", {
    name: Sequelize.STRING,
    price: Sequelize.FLOAT,
    description: Sequelize.STRING,
  });

  Product.associate = function (models) {
    Product.belongsTo(models.Sale, { foreignKey: "saleId", as: "sale" });
    Product.belongsToMany(models.Product, {
      through: "ShoppingCartProduct",
      foreignKey: "productId",
      as: "products",
    });
  };

  return Product;
};
