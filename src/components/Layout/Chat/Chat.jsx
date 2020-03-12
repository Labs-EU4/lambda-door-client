import React from 'react';
// import { getMessages } from '../../../utils/firebase';
// import { getMessages } from '../../../state/actions/chat';

import { connect } from 'react-redux';
import { Avatar, Icon, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ChatCon = styled.div`
  position: fixed;
  background: #fff;
  bottom: 0;
  right: 0;
  margin-right: 2em;
  z-index: 5;
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
  /* background: #fff; */
  height: 100%;
  overflow-y: auto;
  padding-bottom: 9em;

  &::-webkit-scrollbar {
    width: 0em;
  }

  &::-moz-scrollbar-width {
    width: 0em;
  }

  &::-ms-scrollbar-width {
    width: 0em;
  }

  .chat_message {
    background: #534f59;
    margin: 0.5em 0.4em;
    border-radius: 5px;
    font-size: 0.8rem;
    color: #fff;
    width: 65%;

    p {
      width: auto;
      margin: 0.8em 0.4em;
      padding-top: 0.3em;
      padding-bottom: 0.3em;
    }
  }
`;

const ChatFooter = styled.div`
  background: #ffffff;
  position: inherit;
  bottom: 0;
  width: inherit;
  height: 42px;
  -webkit-box-shadow: 0px -7px 13px -13px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -7px 13px -13px rgba(0, 0, 0, 0.75);
  box-shadow: 0px -7px 13px -13px rgba(0, 0, 0, 0.75);

  .ant-input-affix-wrapper {
    display: flex;
    justify-content: center;

    .ant-input {
      width: 95%;
      height: auto;
      margin: 0.3em;
    }
  }

  .ant-input-suffix {
    padding: 0 0.3em;
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
            <div className="chat_message">
              <p>
                something written that is too long to identify do anything about
              </p>
            </div>
            <div className="chat_message">
              <p>
                something written that is too long to identify do anything about
              </p>
            </div>
            <div className="chat_message">
              <p>
                something written that is too long to identify do anything about
              </p>
            </div>
            <div className="chat_message">
              <p>
                something written that is too long to identify do anything about
              </p>
            </div>
            <div className="chat_message">
              <p>
                something written that is too long to identify do anything about
              </p>
            </div>
            <div className="chat_message">
              <p>
                something written that is too long to identify do anything about
              </p>
            </div>
            <div className="chat_message">
              <p>
                something written that is too long to identify do anything about
              </p>
            </div>
            <div className="chat_message">
              <p>
                something written that is too long to identify do anything about
              </p>
            </div>

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
