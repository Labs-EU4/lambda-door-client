import React, { useState, createRef } from 'react';
import {
  sendMessage,
  closeChat,
  markAsRead,
} from '../../../state/actions/chat';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { Avatar, Input, Form, Icon } from 'antd';
import {
  SendOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

const Chat = ({
  sendMessage,
  authState: {
    credentials: { id },
  },
  messages,
  chatID,
  closeChat,
  markAsRead,
  chat,
  form,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const myRef = createRef();

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        sendMessage(values.message, chatID, id);
        form.resetFields();
        myRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        console.log('Enter Required Fields');
      }
    });
  };

  const { getFieldDecorator } = form;

  const markAsReadOnClick = () => {
    // If the last message `fromUserID` is not from the current user mark it as read
    if (
      chat.messages.length &&
      chat.messages[chat.messages.length - 1].fromUserID !== id
    ) {
      markAsRead(chatID);
    }
  };

  return (
    <>
      <ChatCon id="chat_con" className={isMinimized ? 'isMinimized' : ''}>
        <ChatHeader id="chat_header" style={{}}>
          <div className="top-chat">
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
              {(chat.fromUserID === id
                ? chat.toUserName
                : chat.fromUserName
              ).substring(0, 1)}
            </Avatar>
            <h4>
              {chat.fromUserID === id ? chat.toUserName : chat.fromUserName}
            </h4>
          </div>
          <div className="chat_header_icon">
            {isMinimized ? (
              <PlusOutlined
                onClick={minimizeChat}
                style={{ fontSize: '22px', color: '#fff' }}
              />
            ) : (
              <MinusOutlined
                onClick={minimizeChat}
                style={{ fontSize: '22px', color: '#fff' }}
              />
            )}
            <Icon
              type="close"
              style={{
                fontSize: '22px',
                color: '#fff',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
              theme="outlined"
              onClick={e => closeChat(chatID)}
            />
          </div>
        </ChatHeader>

        <ChatBody id="chat_body">
          {messages.map((message, index) => {
            return (
              <div
                className={`chat_message ${
                  message.fromUserID === id ? 'move_right' : null
                }`}
                key={index}
              >
                <p>{message.message}</p>
                <div ref={myRef}></div>
              </div>
            );
          })}
          <span
            style={{
              textAlign: 'right',
              margin: '-7px 10px',
              fontSize: '0.6em',
            }}
          >
            {chat.read ? 'Read' : ''}
          </span>
        </ChatBody>

        <ChatFooter id="chat_footer">
          <Form onSubmit={handleSubmit}>
            <Form.Item>
              {getFieldDecorator('message', {
                rules: [
                  {
                    message: 'Enter valid message',
                  },
                  {
                    required: true,
                    message: 'Enter valid message',
                  },
                ],
              })(
                <Input
                  placeholder="Type a message..."
                  suffix={<SendOutlined onClick={handleSubmit} />}
                  name="message"
                  type="text"
                  autoComplete="off"
                  onClick={e => markAsReadOnClick()}
                />
              )}
            </Form.Item>
          </Form>
        </ChatFooter>
      </ChatCon>
    </>
  );
};

const ChatForm = Form.create({ name: 'text' })(Chat);

export default connect(state => state, { sendMessage, closeChat, markAsRead })(
  ChatForm
);

const ChatCon = styled.div`
  display: inline-block;
  background: white;
  margin-right: 2em;
  max-width: 300px;
  width: 280px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  -webkit-box-shadow: -1px 0px 13px -4px rgba(0, 21, 41, 0.51);
  -moz-box-shadow: -1px 0px 13px -4px rgba(0, 21, 41, 0.51);
  box-shadow: -1px 0px 13px -4px rgba(0, 21, 41, 0.51);

  &.isMinimized {
    #chat_body {
      display: none;
    }
    #chat_footer {
      display: none;
    }
  }
`;

const ChatHeader = styled.div`
  background: #bb1333;
  width: 100%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(217, 217, 217, 1);

  .top-chat {
    display: flex;
    align-items: center;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-left: 1em;
    align-content: center;
    justify-content: space-between;

    h4 {
      margin: 0 0.6em;
      font-weight: 600;
      color: #fff;
    }
  }

  .chat_header_icon {
    display: flex;
    margin-right: 1em;
    align-items: center;
  }
`;

const ChatBody = styled.div`
  height: 250px;
  overflow-y: scroll;
  padding-bottom: 5em;
  display: flex;
  flex-direction: column;

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
    display: flex;
    background: rgb(230, 0, 76);
    margin: 0.5em 0.6em;
    border-radius: 5px;
    font-size: 0.8rem;
    color: #fff;
    width: fit-content;
    max-width: 70%;

    p {
      margin: 0.5em 0.7em;
    }

    &.move_right {
      align-self: flex-end;
      color: #ffffff;
      background: #0099ff;
    }
  }
`;

const ChatFooter = styled.div`
  background: #ffffff;
  position: fixed;
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
    color: #bb1333;
  }
`;
