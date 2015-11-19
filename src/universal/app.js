import Html from './views/Html';
import Routes from './views/layouts/Routes';
import Reduxible from './libs/Reduxible';

const app = new Reduxible({
	CONFIG: __CONFIG__,
	baseMarkup: Html,
	routes: Routes,
	middlewares: middlewares,
	apiHost: `${config.apiHost}:${config.apiPort}`
});

export default app;
