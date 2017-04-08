import debug from 'debug';

const log = debug('electron-react:service/analytics');

const analytics = {
  track(pathname) {
    log('### track ### ', pathname);
  }
};

export default analytics;
