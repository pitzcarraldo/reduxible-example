export const TOGGLE_MENU = 'menu/TOGGLE_MENU';

export function toggleMenu(menuOpen) {
  return {
    type: TOGGLE_MENU,
    payload: { menuOpen }
  };
}

const initialState = {
  menuOpen: false
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case TOGGLE_MENU:
      return { ...state, menuOpen: payload.menuOpen };
    default:
      return state;
  }
}
