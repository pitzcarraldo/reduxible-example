import expect from 'expect';
import Reduxible from '../../src/libs/Reduxible';

describe('ReduxibleConfig', () => {
  it('returns false if development is undefined', () => {
    const config = new ReduxibleConfig({
      devtools: true
    });
    expect(config.useDevTools()).toBe(false);
  });

  it('returns false if development is false', () => {
    const config = new ReduxibleConfig({
      development: false,
      devtools: true
    });
    expect(config.useDevTools()).toBe(false);
  });
});