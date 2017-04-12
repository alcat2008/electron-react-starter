
import { ipcRenderer } from 'electron'; // eslint-disable-line
const debug = require('debug');

const log = debug('electron-react:service/ipc');

class Ipc {
  init() {
    log('init ipc render');

    // log(ipcRenderer.sendSync('synchronous-message', 'ping'));
    // log(ipcRenderer.sendSync('ipc-message', 'ipc-message'));

    ipcRenderer.on('ipc-message-reply', (event, arg) => {
      log(arg);
      // event.sender.send('ipc-message-reply', 'pong');
    });

    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      log(arg); // prints "pong"
    });

    // ipcRenderer.send('asynchronous-message', 'ping');
  }
  send(...args) {
    ipcRenderer.send(...args);
  }
  sendSync(...args) {
    return ipcRenderer.sendSync(...args);
  }
}

module.exports = new Ipc();
