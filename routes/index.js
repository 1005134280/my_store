const express = require('express');
const productsRouter = require('./products.route');
const userRouter = require('./user.roter');
const cotegoryRouter = require('./cotegory.route');



function routerApi(app) {
    const roter = express.Router();
    app.use('/api/v1', roter);
    roter.use('/products', productsRouter);
    roter.use('/users', userRouter);
    roter.use('/categories', cotegoryRouter);
}

module.exports = routerApi;