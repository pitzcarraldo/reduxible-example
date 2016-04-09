export default {
  findUserByAuth: auth => ({
    url: '/auth/user',
    method: 'post',
    data: { auth }
  }),
  login: username => ({
    url: '/auth/login',
    method: 'post',
    data: { username }
  }),
  logout: auth => ({
    url: '/auth/logout',
    method: 'post',
    data: { auth }
  })
};
