const { faker } = require('@faker-js/faker');
const e = require('express');
const boom = require('@hapi/boom');
const { tr } = require('faker/lib/locales');

// customer.service.js

const { models } = require('../libs/sequelize');

const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { User } = require('../db/models/user.model');

class customerService {
  constructor() {}

  async create(data) {
    try {
      // Verificar si el email ya está registrado
      const existingUser = await models.User.findOne({
        where: { email: data.user.email },
      });
      if (existingUser) {
        throw new Error('El correo ya está registrado');
      }

      // Hashear la contraseña del usuario
      const hash = await bcrypt.hash(data.user.password, 10);

      // Preparar los datos para la creación del cliente
      const newData = {
        ...data,
        user: {
          ...data.user,
          password: hash,
        },
      };

      // Crear el cliente y su usuario asociado
      const newCustomer = await models.Customer.create(newData, {
        include: ['user'], // Relación definida en el modelo
      });

      if (newCustomer.user) {
        delete newCustomer.user.dataValues.password; // Eliminar directamente del campo user
      }
  
      return newCustomer;
    } catch (error) {
      // Detectar errores de unicidad
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('El correo ya está registrado');
      }
      // Re-lanzar otros errores
      throw error;
    }
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
    const customer = await this.findOne(id); // Asegurarte de que el registro existe
    if (!customer) {
      throw new Error('Customer not found');
    }
    await models.Customer.destroy({
      where: { id } // Solo elimina el registro con el ID especificado
    });
    return { id };
  }
  
}

module.exports = customerService;
