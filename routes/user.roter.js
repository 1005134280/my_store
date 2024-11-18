const { faker } = require('@faker-js/faker');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const users = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    const user = {
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
    };
    users.push(user);
  }
  res.json(users); // Envia los productos generados aleatoriamente
});

router.get('/id', (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
  });
});

module.exports = router;
