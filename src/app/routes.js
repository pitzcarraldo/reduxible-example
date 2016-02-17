import Layout from './views/containers/Layout/Layout';
import About from './views/containers/About/About';
import Counter from './views/containers/Counter/Counter';
import Todo from './views/containers/Todo/Todo';
import Home from './views/containers/Home/Home';
import Login from './views/containers/Login/Login';
import Profile from './views/containers/Profile/Profile';
import NotFound from './views/containers/NotFound/NotFound';

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
