const express = require('express');
const CustomerService = require('../services/customer.service');
const validatorHandler = require('../middlewares/validator.handler');

const {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customer.schema');

const router = express.Router();

const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.findAll();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});


router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newCustomer = await service.create(body);
    res.status(201).json(newCustomer);
  },
);

router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.params;
      const updateCustomer = await service.update(id, body);
      res.json(updateCustomer);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const customer = await service.delete(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
