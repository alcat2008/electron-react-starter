

// const installExtensions = async () => {
//   if (isDev) {
//     const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

//     const extensions = [
//       'REACT_DEVELOPER_TOOLS',
//       'REDUX_DEVTOOLS'
//     ];
//     const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
//     for (const name of extensions) { // eslint-disable-line
//       try {
//         await installer.default(installer[name], forceDownload);
//       } catch (e) {} // eslint-disable-line
//     }
//   }
// };

const installDevTools = (mainWindow) => {
  if (process.env.NODE_ENV === 'development') {
    require('electron-debug')(); // eslint-disable-line global-require
    mainWindow.openDevTools();
  }
};

module.exports = {
  installDevTools,
};
