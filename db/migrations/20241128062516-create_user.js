'use strict';

const {userSchema, USER_TABLE } = require('./../models/user.model')



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
   await queryInterface.createTable(USER_TABLE, userSchema);
   // ESTOS LOS LOS CAMBIOS 

  },

  async down (queryInterface, Sequelize) {
    // AQUI SE REVIERTE LOS CAMBIOS

    await queryInterface.drop(USER_TABLE);
  }
};
