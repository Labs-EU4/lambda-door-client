import React from 'react';
// import { getMessages } from '../../../utils/firebase';

import { getMessages } from '../../../state/actions/chat';

import { connect } from 'react-redux';

const ChatButton = ({
  chatState,
  getMessages,
  authState: {
    credentials: { id },
  },
  toUserID,
}) => {
  const chatClick = e => {
    // getMessages(id, toUserID);
    // create new chat
  };

  return <div onClick={e => chatClick()}>Chat with me</div>;
};

export default connect(state => state, { getMessages })(ChatButton);
