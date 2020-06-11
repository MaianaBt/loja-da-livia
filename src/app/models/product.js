"use strict";
module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("Product", {
    name: Sequelize.STRING,
    price: Sequelize.FLOAT,
    description: Sequelize.STRING,
  });

  Product.associate = function (models) {
    Product.belongsTo(models.Sale, { foreignKey: "saleId", as: "sale" });
    Product.belongsToMany(models.ShoppingCart, {
      through: "ShoppingCartProducts",
      foreignKey: "productId",
    });
  };

  return Product;
};
