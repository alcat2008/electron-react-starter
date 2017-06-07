
const { ipcMain } = require('electron');
const debug = require('debug');
const notifier = require('electron-notifications');

const log = debug('electron-react:main/ipc');

class Ipc {
  init(mainWindow) {
    log('init ipc main');

    ipcMain.on('print', () => {
      mainWindow.webContents.print({
        silent: true,
        printBackground: false,
      });
    });

    ipcMain.on('ipc-message', (event, arg) => {
      log('arg => ', arg);
      event.sender.send('asynchronous-reply', mainWindow.webContents.getPrinters());

      const notification = notifier.notify(arg, {
        message: 'This is notification message',
        // icon: 'http://cl.ly/J49B/3951818241085781941.png',
        buttons: ['Dismiss', 'Snooze'],
        // vertical: true,
        duration: 10000,
        flat: true,
      });

      notification.on('buttonClicked', (text, buttonIndex, options) => {
        if (text === 'Snooze') {
          // Snooze!
        } else if (buttonIndex === 1) {
          // open options.url
        }
        log(JSON.stringify(options)); // eslint-disable-line
        notification.close();
      });
      // event.sender.send('ipc-message-reply', 'ipc-message-reply');
    });

    ipcMain.on('asynchronous-message', (event, arg) => {
      log(arg);  // prints "ping"
      event.sender.send('asynchronous-reply', 'pong');
    });

    ipcMain.on('synchronous-message', (event, arg) => {
      log(arg);  // prints "ping"
      event.returnValue = 'pong';
    });
  }
}

module.exports = new Ipc();
