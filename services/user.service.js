const { faker } = require('@faker-js/faker');
const e = require('express');
const boom = require('@hapi/boom');
const { tr } = require('faker/lib/locales');

const { models } = require('../libs/sequelize');
const { Model } = require('sequelize');

class UserService {
  constructor() {
    this.users = [];
    //  this.generate();
  }

  async findUsers() {
    const rta = await models.User.findAll();
    return rta;
  }

  async findOneUser(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('usr not found');
    }
    return user;
  }

  async createUser(data) {
    const existingUser = await models.User.findOne({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new Error('El correo ya está registrado'); // Lanzar un error si el correo existe
    }
    const newUser = await models.User.create(data);
    return newUser;
  }

  async updateUser(id, changes) {
    const user = await this.findOneUser(id);
    const rta = await user.update(changes);
    return rta;
  }

  async deleteUser(id) {
    const user = await this.findOneUser(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
