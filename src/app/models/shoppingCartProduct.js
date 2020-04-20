"use strict";
const config = require("../../config/environment");

module.exports = (sequelize, Sequelize) => {
  const ShoppingCartProduct = sequelize.define("ShoppingCartProduct", {
    quantity: Sequelize.INTEGER,
  });

  ShoppingCartProduct.associate = function (models) {
    ShoppingCartProduct.belongsTo(models.Product, { foreignKey: "productId" });
    ShoppingCartProduct.belongsTo(models.ShoppingCart, {
      foreignKey: "cartId",
    });
  };

  return ShoppingCartProduct;
};
