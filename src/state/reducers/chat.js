import * as types from '../types';

const initialState = {
  chats: []
};

// eslint-disable-next-line import/prefer-default-export
export const chatState = (state = initialState, action) => {
  switch (action.type) {
    case types.CHAT_OPEN:
      return {
        ...state,
      };
    case types.GET_OPEN_CHATS:
      state.chats[action.payload.docID] = action.payload;

      return {
        ...state,
        chats: state.chats,
      };
    case types.SET_CHAT_MESSAGES:
      // mutating! no good!
      state.chats[action.payload.docID] = {
        ...state.chats[action.payload.docID],
        messages: action.payload.messages,
      };

      return {
        ...state,
        chats: state.chats,
      };
    case types.CLOSE_CHAT:
      // mutating! no good!
      delete state.chats[action.payload];
      return {
        ...state,
        chats: state.chats,
      };
      break;
    default:
      return state;
  }
};

export default chatState;
