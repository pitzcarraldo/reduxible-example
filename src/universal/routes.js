import App from './views/containers/App/App';
import About from './views/containers/About/About';
import Counter from './views/containers/Counter/Counter';
import Todo from './views/containers/Todo/Todo';
import Home from './views/containers/Home/Home';
import Login from './views/containers/Auth/Login';
import Logout from './views/containers/Auth/Logout';
import Profile from './views/containers/Profile/Profile';
import requireAuth from './views/components/Auth/requireAuth';

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
        component: requireAuth(Profile)
      }
    ]
  }
];
