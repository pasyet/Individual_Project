'use strict';
// const author = require('../author.json')
const {hash} = require('../helpers/hash-helper')
const now = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: "tomHolland",
        email: "tom@mail.com",
        password: hash("tomholaandganteng"),
        role: "admin",
        phoneNumber: "0823",
        address: "UK",
        createdAt: now,
        updatedAt: now,
      }
    ], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
