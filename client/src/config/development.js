export default {
  development: true,
  devTools: true,
  server: {
    port: process.env.PORT || 3000
  },
  api: {
    host: 'localhost',
    port: '8080'
  },
  ga: {
    id: process.env.GA_TRACKING_ID || ''
  }
};
