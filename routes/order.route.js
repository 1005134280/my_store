const express = require('express');
const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');

const {
  createOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res) => {
  const orders = await service.findOrders();
  res.json(orders);
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res,next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  },
);9

router.patch(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateOrder = await service.update(id, body);
      res.json(updateOrder);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const order = await service.delete(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  },
);
module.exports = router;
