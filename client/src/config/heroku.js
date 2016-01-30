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
    host: process.env.HOST || 'reduxible-spring-universal.herokuapp.com',
    port: ''
  },
  ga: {
    id: process.env.GA_TRACKING_ID || ''
  }
};
