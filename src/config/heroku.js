export default {
  development: false,
  universal: true,
  devTools: false,
  client: {},
  server: {
    current: !(process.env.CLIENT || false),
    port: process.env.PORT || 8080
  },
  api: {
    host: process.env.HOST || 'reduxible.herokuapp.com',
    port: ''
  }
};
