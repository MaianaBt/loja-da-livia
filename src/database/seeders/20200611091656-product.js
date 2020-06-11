"use strict";

const PRODUCTS = [
  {
    name: "hat",
    price: 23.45,
  },
  {
    name: "jeans",
    price: 120.45,
  },
  {
    name: "muscle tee",
    price: 40,
  },
  {
    name: "shoes",
    price: 300,
    saleId: 1,
  },
  {
    name: "short",
    price: 70.99,
    saleId: 2,
  },
];

module.exports = {
  up: async (queryInterface) => {
    for (const product of PRODUCTS) {
      const existing = await queryInterface.rawSelect(
        "Products",
        { where: { name: product.name } },
        ["id"]
      );
      if (!existing || existing.length === 0) {
        await queryInterface.bulkInsert("Products", [product], {});
      } else console.log(`Product '${product.name}' alredy exists.`);
    }
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
