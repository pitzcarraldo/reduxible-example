import reducer from './reducer';
export default reducer(
  {
    menuOpen: false
  },
  {
    TOGGLE_MENU: {
      action: (value) => {
        return {
          type: 'TOGGLE_MENU',
          value: value
        };
      },
      reduce: (value) => {
        return {
          menuOpen: value
        };
      }
    }
  });
