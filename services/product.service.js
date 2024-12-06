const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const { where } = require('sequelize');

class ProductService {
  constructor() {}
    /**
   * This function returns all products in the database.
   * It also includes the category of each product.
   * The results are paginated, so it only returns 10 products per request.
   * The offset is always 0, so it will return the first 10 products.
   * @return {Promise<Array<Product>>} An array of products.
   */
  async findProducts(query) {
    const opcions = {
      include: ['category'],
      where: {},
    };
    const { limit, offset } = query;
    if (limit && offset) {
      opcions.offset = offset;
      opcions.limit = limit;
    }
    
    const { price_min, price_max } = query;
    if (price_min && price_max) {
      opcions.where.price = {
        [Op.between]: [price_min, price_max],
      };
    }

    const rta = await models.Product.findAll(opcions);
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
