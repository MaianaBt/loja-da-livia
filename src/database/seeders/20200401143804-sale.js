"use strict";

const SALES = [
  {
    name: "TAKE_2_FOR_1",
  },
  {
    name: "3_BY_10",
  },
];

module.exports = {
  up: async (queryInterface) => {
    for (const sale of SALES) {
      const existing = await queryInterface.rawSelect(
        "Sales",
        { where: { name: sale.name } },
        ["id"]
      );
      if (!existing || existing.length === 0) {
        await queryInterface.bulkInsert("Sales", [sale], {});
      } else console.log(`Sale '${sale.name}' alredy exists.`);
    }
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("Sales", null, {});
  },
};
