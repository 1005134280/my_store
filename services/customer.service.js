const { faker } = require('@faker-js/faker');
const e = require('express');
const boom = require('@hapi/boom');
const { tr } = require('faker/lib/locales');

// customer.service.js

const { models } = require('../libs/sequelize');

const { Model } = require('sequelize');

class customerService {
  constructor() {}

  async create(data) {
    /*const existingUser = await models.Customer.findOne({
      where: { id: data.id },
    });
    if (existingUser) {
      throw new Error('El id ya está registrado'); // Lanzar un error si el correo existe
    }*/

    const newCustomer = await models.Customer.create(data,{
      include: ['user']
    });
    return newCustomer;
  }

  async findAll() {
    const customers = await models.Customer.findAll({
      include: ['user'],
    });
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
    const rta = await models.Customer.update(change);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await models.Customer.destroy();
    return { id };
  }
}

module.exports = customerService;
