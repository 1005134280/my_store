'use strict';

const {  DataTypes } = require('sequelize');

const { CUSTOMER_TABLE } = require('./../models/customer.model')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,      
      type: DataTypes.INTEGER,
      Unique: true,
    });
    // ESTOS LOS LOS CAMBIOS
  },

  async down(queryInterface) {
    // AQUI SE REVIERTE LOS CAMBIOS
    /// await queryInterface.dropTable(USER_TABLE);
  },
};
