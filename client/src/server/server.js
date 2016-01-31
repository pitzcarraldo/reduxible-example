import "script!babel-core/browser-polyfill.min";
import config from "../config/index";
import assets from "../../../webpack-assets.json";
import Application from "../universal/Application";

const app = new Application({
  server: true,
  development: config.development,
  universal: config.universal,
  devTools: config.devTools,
  extras: {assets}
});

export default function render(req, res) {
  app.server()(req, res);
  return res;
};