export const INCREMENT = 'counter/INCREMENT';
export function increment() {
  return {
    type: INCREMENT
  };
}

const initialState = {
  count: 0
};

export default function reducer(state = initialState, { type }) {
  switch (type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
