"use strict";
const { Op } = require("sequelize");

const QUANTITY_CART = 1;

module.exports = {
  up: async (queryInterface) => {
    for (let i = 0; i < QUANTITY_CART; i++) {
      const existing = await queryInterface.rawSelect(
        "ShoppingCarts",
        {
          where: { id: { [Op.gte]: 0 } },
        },
        ["id"]
      );
      const cart = {
        amount: 0,
      };
      if (!existing || existing < QUANTITY_CART) {
        await queryInterface.bulkInsert("ShoppingCarts", [cart], {});
      } else console.log(`ShoppingCarts alredy exists.`);
    }
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("ShoppingCarts", null, {});
  },
};
