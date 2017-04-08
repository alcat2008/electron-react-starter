// @flow
import App from './App';
import Home from './components/Home';
import Counter from './components/Counter';

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: '/counter', component: Counter },
  ],
};

export default routes;
