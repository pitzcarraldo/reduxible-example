export default {
  development: false,
  universal: true,
  client: {},
  server: {
    current: !(process.env.CLIENT || false),
    port: process.env.PORT || 8080
  },
  api: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080
  },
  ga: {
    id: process.env.GA_TRACKING_ID || ''
  }
};
