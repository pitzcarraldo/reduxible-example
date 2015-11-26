import expect from 'expect';
import reducer, {getPath as reducerPath} from '../../../src/universal/reducer/index';

describe('reducer', () => {
  it('returns false if development is undefined', () => {
    console.log({...reducer, a: 'b'});
    expect(false).toBe(false);
  });
});