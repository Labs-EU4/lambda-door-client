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
  display: flex;
  justify-content: space-between;

  .top-chat {
    display: flex;
    align-items: center;
    border: 1px solid blue;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-left: 1em;
    align-content: center;
    width: 120px;
    justify-content: space-between;
    h4 {
      margin-right: 0.6em;
      margin-bottom: 0;
    }
  }
  .Icon {
    display: flex;
    margin-right: 1.5em;
    align-items: center;
  }
`;

const ChatBody = styled.div`
  position: relative;
  background: #188c07;
  height: 100%;
  overflow: auto;
`;

const ChatFooter = styled.div`
  background: #530caf;
  position: inherit;
  bottom: 0;
  width: inherit;
  height: 40px;
  text-align: center;
  overflow: hidden;

  .ant-input {
    width: 95%;
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
            <div className="top-chat">
              <Avatar />
              <h4>User Name</h4>
            </div>
            <div className="Icon">
              <Icon
                type="message"
                style={{ fontSize: '22px', color: '#08c' }}
                theme="outlined"
              />
            </div>
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
            <Input placeholder="Type a message..." suffix={<SendOutlined />} />
          </ChatFooter>
        </ChatCon>
      ) : (
        <></>
      )}
    </>
  );
};

export default connect(state => state, {})(Chat);
