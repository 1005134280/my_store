const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProductService {
  constructor() {}

  async findProducts() {
    const rta = await models.Product.findAll({
      include: ['category'],
    });
    return rta;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async update(id, change) {
    const product = await this.findOne(id);
    const rta = await models.Product.update(change);
    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await models.Product.destroy();
    return { id };
  }
}

module.exports = ProductService;
