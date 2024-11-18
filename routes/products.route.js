const express = require('express');

const ProductService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/products.schema');

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
  const products = await service.findProducts();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Hello World!');
});

router.patch('/:id', 
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.updateProduct(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});
router.delete(
  '/:id',

  async (req, res) => {
    const { id } = req.params;
    const product = await service.deleteProduct(id);
    res.json(product);
  },
);

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOneProduct(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.createProduct(body);

    res.status(201).json(newProduct);
  },
);

module.exports = router;
