'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sale', [
      {
        name: 'TAKE_2_FOR_1'
      },
      {
        name: '3_BY_10'
      }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sale', null, {});
  }
};
