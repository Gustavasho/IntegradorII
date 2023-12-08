const { app } = require('electron');
const { createWindow } = require('./src/app/windows');
const { initServer } = require('./src/routes/main.route');
const { initDB } = require('./src/app/db');

initServer();
initDB();
