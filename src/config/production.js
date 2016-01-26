export default {
  development: false,
  devTools: false,
  server: {
    port: process.env.PORT || 8080
  },
  api: {
    host: 'reduxible.herokuapp.com'
  },
  ga: {
    id: process.env.GA_TRACKING_ID || ''
  }
};
