'use strict';

const { ProductSchema, PRODUCT_TABLE } = require('./../models/product.model');

const {
  CategorySchema,
  CATEGORY_TABLE,
} = require('./../models/category.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);

    // ESTOS LOS LOS CAMBIOS
  },

  async down(queryInterface, Sequelize) {
    // AQUI SE REVIERTE LOS CAMBIOS

    await queryInterface.drop(CATEGORY_TABLE);
    await queryInterface.drop(PRODUCT_TABLE);
  },
};
