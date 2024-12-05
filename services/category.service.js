const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CategoryService {
  async findCategories() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOneCategory(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!category) {
      throw boom.notFound('category not found');
    }
    return category;
  }

  async createCategory(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async updateCategory(id, change) {
    const category = await this.findOneCategory(id);
    const rta = await models.category.update(change);
    return rta;
  }

  async deleteCategory(id) {
    const category = await this.findOneCategory(id);
    if (!category) {
      throw new Error('Category not found');
    }
    await models.Category.destroy({
      where: { id }, // Proporcionar el ID como condición de filtro
    });

    return { id };
  }
}

module.exports = CategoryService;
