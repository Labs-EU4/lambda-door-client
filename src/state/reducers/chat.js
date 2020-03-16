import * as types from '../types';

const initialState = {
  chats: [
    {
      toUserID: 1,
      fromUserID: 6,
      messages: [{
        message: "this is a new message",
      }],
      open: true
    },
    {
      toUserID: 1,
      fromUserID: 6,
      messages: [{
        message: "second message",
      }],
      open: true
    }
  ],
};

// eslint-disable-next-line import/prefer-default-export
export const chatState = (state = initialState, action) => {
  switch (action.type) {
    case types.CHAT_OPEN:
      return {
        ...state,
      };
    // case types.GET_CHAT_MESSAGES:
    //   return {
    //     ...state,
    //     messages: action.payload,
    //   };
    case types.GET_OPEN_CHATS:
      return {
        ...state,
        chats: action.payload,
      };
    case types.SET_CHAT_MESSAGES:
      console.log('...state.chats');
      console.log(state.chats);

      // mutating! no good!
      state.chats[action.payload.docID] = {
        ...state.chats[action.payload.docID],
        messages: action.payload.messages,
      };

      return {
        ...state,
        chats: state.chats,
      };
    default:
      return state;
  }
};

export default chatState;
