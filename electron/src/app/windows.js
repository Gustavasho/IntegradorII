const { BrowserWindow } = require('electron');
const { initTempFolder, loadConfiguration } = require('./file-app');
const { initDB } = require('./db');

const dirname = __dirname
const appFolder = '/../../dist/geodat'
const assetsFolder = '/assets'
const config = loadConfiguration( 'app.json' );

let win;

// Iniciando configuraciones
initTempFolder();
initDB();


createWindow = () => {
  win = new BrowserWindow({
      width: config.width,
      height: config.height,
      backgroundColor: '#ffffff',
      icon: `file://${dirname}${appFolder}${assetsFolder}/${config.icon}`,
      autoHideMenuBar: config.autoHideMenuBar,
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
      }
  });

  win.loadURL(`file://${dirname}${appFolder}/${config.htmlFile}`);

  if( config.isMaximizable ){
    win.maximize();
  }

  if( config.showDevOptions ){
    win.webContents.openDevTools();
  }

  win.on('closed', function() { win = null });
}

module.exports = {
  createWindow
}
