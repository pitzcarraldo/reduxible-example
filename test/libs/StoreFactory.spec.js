import expect from 'expect';
import ReduxibleConfig from '../../src/libs/ReduxibleConfig';
import StoreFactory from '../../src/libs/StoreFactory';
import reducer from '../../src/universal/reducer/index';
import middleware from '../../src/universal/middleware/index';

describe('StoreFactory', () => {
  it('returns false if development is undefined', () => {
    const config = new ReduxibleConfig({
      server: true,
      development: true,
      universal: true,
      devTools: true
    });
    const storeFactory = new StoreFactory({config, reducer, middleware});
    const store = storeFactory.createStore();
    expect(store).toNotBe(undefined);
  });
});