import * as types from '../types';

const initialState = {
  isChatOpen: false,
  messages: [],
};

// eslint-disable-next-line import/prefer-default-export
export const chatState = (state = initialState, action) => {
  switch (action.type) {
    case types.CHAT_OPEN:
      return {
        ...state,
        isChatOpen: true,
      };
    case types.GET_CHAT_MESSAGES:
      return {
        ...state,
        isChatOpen: true,
        messages: action.payload,
      };
    default:
      return state;
  }
};

export default chatState;
