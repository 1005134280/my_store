const { faker } = require('@faker-js/faker');
const e = require('express');
const boom = require('@hapi/boom');
const { tr } = require('faker/lib/locales');

class CategoryService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  async generate() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: faker.string.uuid(),
        name: faker.commerce.department(),
      });
    }
  }

  async createCategory(data) {
    const newCategory = {
      id: faker.string.uuid(),
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }
  async findCategories() {
    return this.categories;
  }
  async findOneCategory(id) {
    const category = this.categories.find((item) => item.id === id);

    if (!category) {
      throw boom.notFound('category not found');
    }
    if (category.isBlock) {
      throw boom.conflict('category is block');
    }
    return category;
  }

  async updateCategory(id, changes) {
    const index = this.categories.findIndex((item) => item.id === id);

    if (index === -1) {
      throw boom.notFound('Category not found');
    }

    const category = this.categories[index];

    this.categories[index] = {
      ...category,
      ...changes,
    };

    return this.categories[index];
  }


  async deleteCategory(id) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }
}


module.exports = CategoryService;