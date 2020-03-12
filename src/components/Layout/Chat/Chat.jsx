import React from 'react';
// import { getMessages } from '../../../utils/firebase';
// import { getMessages } from '../../../state/actions/chat';

import { connect } from 'react-redux';
import { Avatar, Icon, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
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
  background: #ea252f;
  position: relative;
  width: 100%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const ChatBody = styled.div`
  position: relative;
  background: #188c07;
  height: 100%;
  overflow: hidden;
`;

const ChatFooter = styled.div`
  background: #530caf;
  position: inherit;
  bottom: 0;
  width: inherit;
  height: 40px;

  .ant-input {
    width: inherit;
    height: auto;
    margin: 0.3em;
  }
`;


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
            <p>
              something written that is too long to identify do anything about
            </p>
            <p>
              something written that is too long to identify do anything about
            </p>
            <p>
              something written that is too long to identify do anything about
            </p>
            <p>
              something written that is too long to identify do anything about
            </p>
            <p>
              something written that is too long to identify do anything about
            </p>
            <p>
              something written that is too long to identify do anything about
            </p>
            <p>
              something written that is too long to identify do anything about
            </p>
            <p>
              something written that is too long to identify do anything about
            </p>
            <p>
              something written that is too long to identify do anything about
            </p>
            <p>
              something written that is too long to identify do anything about
            </p>
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

          <ChatFooter>
            <Input placeholder="Type a message..."/>
          </ChatFooter>
        </ChatCon>
      ) : (
        <></>
      )}
    </>
  );
};

export default connect(state => state, {})(Chat);
