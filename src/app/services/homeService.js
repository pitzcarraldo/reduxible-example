import api from '../apis/homeApis';

export const SET_CONTENT = 'home/SET_CONTENT';

function setContent(content) {
  return {
    type: SET_CONTENT,
    payload: { content }
  };
}

export function loadContent() {
  return async({ $http }) => {
    const { data: content } = await $http.request(api.findAll());
    return setContent(content);
  };
}

const initialState = {
  content: []
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_CONTENT:
      return { ...state, content: payload.content };
    default:
      return state;
  }
}
