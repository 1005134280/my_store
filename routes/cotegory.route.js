const express = require('express');
const CategoryService = require('../services/category.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/category.schema');

const service = new CategoryService();

const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await service.findCategories();
  res.json(categories);
});

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOneCategory(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newCategory = await service.createCategory(body);

    res.status(201).json(newCategory);
  },
);

router.patch(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),    
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.updateCategory(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',        
  validatorHandler( getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.deleteCategory(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
)

module.exports = router;