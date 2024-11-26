const { faker } = require('@faker-js/faker');
const e = require('express');
const boom = require('@hapi/boom');
const { tr } = require('faker/lib/locales');

const sequelize = require('../libs/sequelize');



class ProductService {
  constructor() {
    this.products = [];
    this.generate();
   
  }

  async findProducts() {
    const query = 'SELECT * FROM tasks';
    const [data, metadata] = await sequelize.query(query); // Desestructuración
    return data; // Solo devolver los datos, no la metadata
  }
  
  generate() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(), // Cambiado a "faker.image.url()"
        isBlock: faker.datatype.boolean(),
      });
    }
  }
  async createProduct(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }



  async findOneProduct(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  


  async updateProduct(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];

    // lo que hace es remplazar  no todos los datos si no solo los cambios que se le dan
    // para eso son los puntos ...que es persista los ultimos detos que ya tenian antes el objeto y haga los cambios
    this.products[index] = {
      ...product,
      ...changes,
    };

    return this.products[index];
  }

  async deleteProduct(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    // Este esplice lo que aace es que le envio una pocicion y elina en el segundo numero cuantos elementos quiro eliminar
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductService;





