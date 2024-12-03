'use strict';

const {CustomerSchema,CUSTOMER_TABLE  } = require('./../models/customer.model')



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
   await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
   // ESTOS LOS LOS CAMBIOS 

  },

  async down (queryInterface, Sequelize) {
    // AQUI SE REVIERTE LOS CAMBIOS

    await queryInterface.drop(CUSTOMER_TABLE);
  }
};
