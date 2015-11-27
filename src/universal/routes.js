import App from './views/containers/App/App';
import About from './views/containers/About/About';
import Counter from './views/containers/Counter/Counter';
import Home from './views/containers/Home/Home';

export default [
  {
    path: '/',
    component: App,
    indexRoute: {
      component: Home
    },
    childRoutes: [
      {
        path: 'about',
        component: About
      },
      {
        path: 'counter',
        component: Counter
      }
    ]
  }
];
