
const { faker } = require('@faker-js/faker');
const e = require('express');
const boom = require('@hapi/boom');
const { tr } = require('faker/lib/locales');

// customer.service.js


const { models } = require('../libs/sequelize');

console.log(models);  // Esto debería mostrar todos los modelos cargados en sequelize

const { Model } = require('sequelize');

class customerService {
  constructor() {}

  async create(data) {
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async findAll() {
    const customers = await models.Customer.findAll();
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id); // Corregido el uso de 'id'
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async update(id, change) {
    const customer = await this.findOne(id);
    const rta= await models.Customer.update(change);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await models.Customer.destroy();
    return {id};
  }




}


module.exports = customerService;