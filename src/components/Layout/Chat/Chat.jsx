import React from 'react';
// import { getMessages } from '../../../utils/firebase';
// import { getMessages } from '../../../state/actions/chat';

import { connect } from 'react-redux';
import { Avatar, Icon, Input } from 'antd';
import styled from 'styled-components';

const ChatCon = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 2em;
  z-index: 5;
  background: #25ddea;
  max-width: 300px;
  width: 280px;
  height: 300px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const ChatHeader = styled.div`
  position: relative;
  background: #ea252f;
  width: 100%;
`;

const ChatBody = styled.div`
  background: #188c07;
`;

const ChatFooter = styled.div``;


const Chat = ({ chatState }) => {
  const chatClick = e => {};

  return (
    <>
      {chatState.isChatOpen ? (
        <ChatCon onClick={e => chatClick()}>
          <ChatHeader>
            <Avatar />
            <h4>User Name</h4>
            <Icon
              type="message"
              style={{ fontSize: '16px', color: '#08c' }}
              theme="outlined"
            />
          </ChatHeader>

          <ChatBody>
          {console.log(`chatState messages`, chatState.messages)}
          <p>something written</p>
          {chatState.messages.map(message => {
            console.log(message);
            return (
              <>
                <br />
                {message.message}
              </>
            );
          })}
          </ChatBody>

        </ChatCon>
      ) : (
        <></>
      )}
    </>
  );
};

export default connect(state => state, {})(Chat);
