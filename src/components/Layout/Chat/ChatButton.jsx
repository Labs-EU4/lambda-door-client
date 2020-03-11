import React from 'react';
// import { getMessages } from '../../../utils/firebase';

import { getMessages } from '../../../state/actions/chat';

import { connect } from 'react-redux';

const ChatButton = ({ chatState, getMessages }) => {
  const chatClick = e => {
    console.log('his');
    console.log(chatState);
    getMessages(123, 456);
  };

  return <div onClick={e => chatClick()}>Chat with me</div>;
};

export default connect(state => state, { getMessages })(ChatButton);
