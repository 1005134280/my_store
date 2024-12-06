'use strict';

const {USER_TABLE, UserSchema } = require('../db/models/user.model')



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
   await queryInterface.createTable(USER_TABLE, UserSchema);
   // ESTOS LOS LOS CAMBIOS 

  },

  async down (queryInterface, Sequelize) {
    // AQUI SE REVIERTE LOS CAMBIOS

    await queryInterface.dropTable(USER_TABLE);
  }
};
