const { faker } = require('@faker-js/faker');
const e = require('express');
const boom = require('@hapi/boom');
const { tr } = require('faker/lib/locales');

const getConnection = ('.../lib/postgres');



class UserService { 
    constructor() {
        this.users = [];
        this.generate();
    }   
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
    }


    async findUsers() {
       const cliente = await getConnection();
       const rta = await cliente.query('SELECT * FROM tasks')
       return rta.rows;
    }

    async findOneUser(id) {
        return this.users.find(item => item.id === id);
       
    }



    async createUser(data) {
        const newUser = {
            id: faker.string.uuid(),
            ...data,
        };
        this.users.push(newUser);
        return newUser;
    }

    async updateUser(id, changes) {
        const index = this.users.findIndex((item) => item.id === id);
        if (index === -1) {
            throw boom.notFound('User not found');
        }
        const user = this.users[index];
        this.users[index] = {
            ...user,
            ...changes,
        };
        return this.users[index];
    }

    async deleteUser(id) {
        const index = this.users.findIndex((item) => item.id === id);
        if (index === -1) {
            throw boom.notFound('User not found');
        }
        this.users.splice(index, 1);
        return { id };
    }

}



module.exports = UserService;