'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Foods', [{
      id: 1,
      name: 'Banana',
      calories: 150,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 6,
      name: 'Yogurt',
      calories: 550,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 12,
      name: 'Apple',
      calories: 220,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Foods', null, {});
  }
};
