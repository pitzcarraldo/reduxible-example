export default {
  development: true,
  universal: true,
  devTools: true,
  client: {
    host: 'localhost',
    port: 8080
  },
  server: {
    current: !(process.env.CLIENT || false),
    host: 'localhost',
    port: 3000
  },
  api: {
    host: 'localhost',
    port: 8080
  }
};
