import React from 'react';
import { openChat } from '../../../state/actions/chat';
import { connect } from 'react-redux';
import { Button } from 'antd';

const ChatButton = ({
  openChat,
  authState: {
    credentials: { id, full_name },
  },
  toUserID,
  toUserName,
}) => {
  const chatClick = e => {
    openChat(id, full_name, toUserID, toUserName);
  };

  return <Button onClick={e => chatClick()}>Chat with me</Button>;
};

export default connect(state => state, { openChat })(ChatButton);
