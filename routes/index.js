const express = require('express');
const productsRouter = require('./products.route');
const userRouter = require('./user.roter');
const cotegoryRouter = require('./cotegory.route');
const customerRouter = require('./customer.route');
const orderRouter = require('./order.route');
const authRouter = require('./auth.router');


function routerApi(app) {
    const roter = express.Router();
    app.use('/api/v1', roter);
    roter.use('/products', productsRouter);
    roter.use('/users', userRouter);
    roter.use('/categories', cotegoryRouter);
    roter.use('/customer', customerRouter);
    roter.use('/order', orderRouter);
    roter.use('/auth', authRouter);
}

module.exports = routerApi;