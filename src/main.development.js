
const { app, BrowserWindow, Menu, Tray, dialog, nativeImage } = require('electron'); // eslint-disable-line
const path = require('path');
const debug = require('debug');
const { createMenu } = require('./main/menu');
const Ipc = require('./main/ipc');

const log = debug('electron-react:main');
log('main process begins initialize');

let mainWindow = null;
const isDev = process.env.NODE_ENV === 'development';

if (!isDev) {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if (isDev) {
  require('electron-debug')(); // eslint-disable-line global-require
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'src', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


const installExtensions = async () => {
  if (isDev) {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) { // eslint-disable-line
      try {
        await installer.default(installer[name], forceDownload);
      } catch (e) {} // eslint-disable-line
    }
  }
};

app.on('ready', async () => {
  await installExtensions();

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 768,
    webPreferences: {
      // nodeIntegration: true,
      // webSecurity: true,
      preload: path.resolve(path.join(__dirname, '../resources/lib/preload.js'))
    },
  });

  if (isDev) {
    // eslint-disable-next-line no-console
    console.log('** loadURL: ', `file://${__dirname}/public/index.html`);
    mainWindow.loadURL(`file://${__dirname}/public/index.html`);
  } else {
    // eslint-disable-next-line no-console
    console.log('** loadURL: ', `file://${__dirname}/index.html`);
    mainWindow.loadURL(`file://${__dirname}/index.html`);
  }

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (isDev) {
    mainWindow.openDevTools();
  }

  Menu.setApplicationMenu(createMenu(mainWindow));
  Ipc.init(mainWindow);
});
