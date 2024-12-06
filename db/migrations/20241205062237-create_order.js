'use strict';

const { OrderSchema, ORDER_TABLE } = require('./../models/order.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Crear la tabla con el esquema definido
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
  },

  async down(queryInterface) {
    // Revertir los cambios: eliminar la tabla
    await queryInterface.dropTable(ORDER_TABLE);
  },
};