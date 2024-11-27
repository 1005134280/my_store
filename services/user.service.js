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
  }/*
  generate() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
      });
    }
  }*/

  async findUsers() {
    const rta = await models.User.findAll();
    return rta;
  }

  async findOneUser(id) {
    const user = await models.User.findByPk(id);
    if(!user){
        throw boom.notFound('usr not found');
    }
    return user;
  }

  async createUser(data) {
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
  return {id}
  }
}

module.exports = UserService;
