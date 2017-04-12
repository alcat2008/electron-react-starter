
import debug from 'debug';
import electron from 'electron';
import context from 'electron-contextmenu-middleware';
import input from 'electron-input-menu';

const log = debug('electron-react:utils/platform');

const { app } = electron.remote;

const appPath = app.getAppPath();
const userDataPath = app.getPath('userData');
log('app.getAppPath() ==> ', appPath);
log('app.getPath(userData) ==> ', userDataPath);

function isMenu(node) {
  if (node.matches('a')) {
    // TODO. custom context menu judgement
    return true;
  }
  return false;
}

// eslint-disable-next-line no-unused-vars
function generateMenuTemplate(node, dispatch) {
  return {
    label: 'custom context menu',
    click: () => {
      log('custom context menu => ', node);
      // TODO. custom context menu actions
    }
  };
}

function linkableMenu(dispatch) {
  return (ctx, next) => {
    let node = ctx.elm;

    while (node) {
      if (isMenu(node)) {
        const { menu } = ctx;
        menu.push(generateMenuTemplate(node, dispatch));
        break;
      }
      node = node.parentElement;
    }

    next();
  };
}

function initContextMenu(_dispatch) {
  context.use(input);
  context.use(linkableMenu(_dispatch));

  if (process.env.NODE_ENV === 'development') {
    const debugMenu = require('debug-menu'); // eslint-disable-line
    context.use(debugMenu.middleware);
  }

  context.activate();
}

export {
  appPath,
  userDataPath,
  initContextMenu,
};
