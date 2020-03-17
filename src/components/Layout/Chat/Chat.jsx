import React, { useState, createRef } from 'react';
import { sendMessage } from '../../../state/actions/chat';
import { connect } from 'react-redux';
import { Avatar, Input, Form } from 'antd';
import {
  SendOutlined,
  ArrowsAltOutlined,
  ShrinkOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

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
    width: 120px;
    justify-content: space-between;

    h4 {
      margin-right: 0.6em;
      margin-bottom: 0;
      font-weight: 600;
      color: #fff;
    }
  }

  .chat_header_icon {
    display: flex;
    margin-right: 1.5em;
    align-items: center;
  }
`;

const ChatBody = styled.div`
  /* position: relative; */
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
    background: #ebebeb;
    margin: 0.5em 0.6em;
    border-radius: 5px;
    font-size: 0.8rem;
    color: rgba(117, 117, 117, 1);
    width: fit-content;
    max-width: 70%;
    /* scroll-margin-bottom: 1em; */

    /* &.move_left {
      align-items: flex-start;
    } */

    p {
      margin: 0.5em 0.7em;
    }

    &.move_right {
      align-self: flex-end;
    }
  }

  /* .chat_message .move_right */
  /* padding-top: 0.3em;
  padding-bottom: 0.3em;
  align-self: flex-end;
  width: auto;
  max-width: 65%;
  margin: 0.8em 0.4em; */
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

const Chat = props => {
  const { authState } = props;

  const [isMinimized, setIsMinimized] = useState(false);

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const myRef = createRef();

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        props.sendMessage(
          values.message,
          props.chatID,
          props.authState.credentials.id
        );
        props.form.resetFields();
        myRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        console.log('Enter Required Fields');
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <>
      <ChatCon id="chat_con" className={isMinimized ? 'isMinimized' : ''}>
        <ChatHeader id="chat_header" style={{}}>
          <div className="top-chat">
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
              U
            </Avatar>
            <h4>User Name</h4>
          </div>
          <div className="chat_header_icon">
            {isMinimized ? (
              <ArrowsAltOutlined
                onClick={minimizeChat}
                style={{ fontSize: '22px', color: '#fff' }}
              />
            ) : (
              <ShrinkOutlined
                onClick={minimizeChat}
                style={{ fontSize: '22px', color: '#fff' }}
              />
            )}
          </div>
        </ChatHeader>

        <ChatBody id="chat_body">
          {console.log(`chatState messages`, props.chatState.messages)}
          {props.messages.map((message, index) => {
            // Set key in return jsx to {message.sentAt} after confirming chats work properly to different individuals;

            // fromUserID === currentUserID align-self:right else align-self: left

            // id={`move_right`}
            // props.authState.credentials.id;
            // message.fromUserID;
            return (
              <div
                className={`chat_message ${
                  message.fromUserID === authState.credentials.id
                    ? 'move_right'
                    : null
                }`}
                key={index}
              >
                <p>{message.message}</p>
                <div ref={myRef}></div>
              </div>
            );
          })}
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

export default connect(state => state, { sendMessage })(ChatForm);
