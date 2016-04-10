export default function loadDevTools(load) {
  return load ? require('./DevTools') : '';
}
