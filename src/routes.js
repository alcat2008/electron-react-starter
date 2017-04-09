// @flow
import App from './containers/App';
import Home from './containers/Home';
import Counter from './containers/Counter';

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: '/counter', component: Counter },
  ],
};

export default routes;
