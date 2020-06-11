"use strict";

module.exports = (sequelize, Sequelize) => {
  const ShoppingCart = sequelize.define("ShoppingCart", {
    amount: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    },
  });

  ShoppingCart.associate = function (models) {
    ShoppingCart.belongsToMany(models.Product, {
      through: "ShoppingCartProducts",
      foreignKey: "cartId",
    });
  };

  return ShoppingCart;
};
