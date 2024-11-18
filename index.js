const { faker } = require('@faker-js/faker');
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handlder')
const boom = require('@hapi/boom');

const app = express();
const port = 3001;

app.use(express.json());
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
origin = (origin, callback) => {
  if (whitelist.indexOf(origin) !== -1) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
}
app.use(cors());

app.get('/', (req, res) => {
  res.send('Si me estoy ejecutando');
});

app.get('/nueva-rutas', (req, res) => {
  res.send('Hola soy una nueva ruta!');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);  

app.listen(port, () => {
  console.log(`Mi servidor está corriendo en el puerto ${port}`);
});
