const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

let server = null;

const initServer = () => {
  const actividadRouter = require('./actividad.route');
  const subactividadRouter = require('./subactividad.route');
  const ocurrenciaRouter = require('./ocurrencia.route');
  const userRouter = require('./user.route');
  const areaRouter = require('./area.route');

  const PORT = process.env.APP_PORT || 3000;

  app.use(bodyParser.json( { limit: '100mb' } ));
  app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));

  app.use(cors({ origin: 'http://localhost:4200' }));

  app.use('/api/actividad', actividadRouter);
  app.use('/api/subactividad', subactividadRouter);
  app.use('/api/ocurrencia', ocurrenciaRouter);
  app.use('/api/user', userRouter);
  app.use('/api/area', areaRouter);

  server = app.listen(PORT, () => {
    console.log(`Servidor iniciado en ${PORT}`);
  });
}

const closeServer = () => {
  if (server == null) {
    return;
  }
  server.close();
}

module.exports = { initServer, app, closeServer }
