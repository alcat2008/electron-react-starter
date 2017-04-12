import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import analytics from './service/analytics';
import ipc from './service/ipc';
import { initContextMenu } from './utils/platform';

const store = configureStore();

ipc.init();
initContextMenu(store.dispatch);

const history = syncHistoryWithStore(hashHistory, store);
history.listen(location => {
  analytics.track(location.pathname);
});

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
