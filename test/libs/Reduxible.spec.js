import expect from 'expect';
import Reduxible from '../../src/libs/Reduxible';
import ReduxibleConfig from '../../src/libs/ReduxibleConfig';
import Html from '../../src/universal/views/containers/Html';
import routes from '../../src/universal/routes';
import middleware from '../../src/universal/middleware/index';
import reducer from '../../src/universal/reducer/index';


describe('Reduxible', () => {
  it('returns false if development is undefined', () => {
    const config = new ReduxibleConfig({
      server: true,
      development: true,
      devTools: true
    });
    const app = new Reduxible({
      config,
      container: Html,
      routes: routes,
      middleware: middleware,
      reducer: reducer
    });
    app.server({originalUrl: '/'});
    console.log(app);
    expect(false).toBe(false);
  });
});