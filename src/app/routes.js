import Layout from './containers/Layout/Layout';
import About from './containers/About/About';
import Counter from './containers/Counter/Counter';
import Todo from './containers/Todo/Todo';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Profile from './containers/Profile/Profile';
import NotFound from './containers/NotFound/NotFound';

export default [
  {
    path: '/',
    component: Layout,
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
      },
      {
        path: 'todo',
        component: Todo
      },
      {
        path: 'login',
        component: Login
      },
      {
        path: 'profile',
        component: Profile
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
];
