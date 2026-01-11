'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('deviceTypes', [
      {
        id: 1,
        name: 'Router',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Switch',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'POS',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('deviceTypes', null, {});
  }
};
