import React, { useState, createRef } from 'react';
import { sendMessage } from '../../../state/actions/chat';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { Avatar, Icon, Input, Form } from 'antd';
import {
  SendOutlined,
  ArrowsAltOutlined,
  ShrinkOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

const ChatCon = styled.div`
  display: inline-block;
  background: none;
  margin-right: 2em;
  max-width: 300px;
  width: 280px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  -webkit-box-shadow: -1px 0px 13px -4px rgba(0, 21, 41, 0.51);
  -moz-box-shadow: -1px 0px 13px -4px rgba(0, 21, 41, 0.51);
  box-shadow: -1px 0px 13px -4px rgba(0, 21, 41, 0.51);
`;

const ChatHeader = styled.div`
  background: #bb1333;
  position: relative;
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
  position: relative;
  height: 70%;
  overflow-y: scroll;
  padding-bottom: 1em;

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
    background: #ebebeb;
    margin: 0.5em 0.4em 0.5em 0.6em;
    border-radius: 5px;
    font-size: 0.8rem;
    color: rgba(117, 117, 117, 1);
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
  console.log(`props`, props);

  // const [isMinimized, setIsMinimized] = useState(false);
  const myRef = createRef();

  // const minimizeChat = () => {
  //   setIsMinimized(!isMinimized);
  //   // const chat_con = document.querySelector('#chat_con');
  //   // const chat_header = document.querySelector('#chat_header');
  //   // const chat_body = document.querySelector('#chat_body');
  //   // const chat_footer = document.querySelector('#chat_footer');

  //   // if (!isMinimized) {
  //   //   // chat_con.style.height = '0 !important';

  //   //   // chat_header.style.position = 'fixed !important';
  //   //   // chat_header.style.bottom = 0;
  //   //   // chat_header.style.width = '280px';

  //   //   // chat_body.style.display = 'none';

  //   //   // chat_footer.style.display = 'none';
  //   // } else {
  //   //   // chat_con.style.height = '300px';
  //   //   // else
  //   //   // chat_header.style.position = 'relative !important';
  //   //   // chat_header.style.bottom = 'unset';
  //   //   // chat_header.style.width = '100%';

  //   //   // chat_body.style.display = 'unset';

  //   //   // chat_footer.style.display = 'unset';
  //   // }

  //   // ON MINIMIZE (ChatCon)
  //   // height: 0 !important; or height: auto;

  //   // ON MINIMIZE (ChatHeader)
  //   // position to fixed
  //   // bottom to 0
  //   // width to 280px

  //   // ON MINIMIZE (ChatBody)
  //   // display: none;

  //   // ON MINIMIZE (ChatFooter)
  //   // display: none;
  // };

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

  const autoScrollMessage = () => {
    const chat_body = document.getElementById('chat_body');

    chat_body.scrollTop = chat_body.scrollHeight - chat_body.clientHeight;
  };

  const { getFieldDecorator } = props.form;

  return (
    <>
      <ChatCon id="chat_con">
        <ChatHeader
          id="chat_header"
          style={{
            position: props.isMinimized
              ? 'fixed !important'
              : 'relative !important',
            bottom: props.isMinimized ? '0' : 'unset',
            width: props.isMinimized ? '280px' : '100%',
          }}
        >
          <div className="top-chat">
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
              U
            </Avatar>
            <h4>User Name</h4>
          </div>
          <div className="chat_header_icon">
            {props.isMinimized ? (
              <ArrowsAltOutlined
                onClick={props.minimizeChat}
                style={{ fontSize: '22px', color: '#fff' }}
              />
            ) : (
              <ShrinkOutlined
                onClick={props.minimizeChat}
                style={{ fontSize: '22px', color: '#fff' }}
              />
            )}
          </div>
        </ChatHeader>

        <ChatBody
          id="chat_body"
          style={{
            display: props.isMinimized ? 'none' : 'unset',
          }}
        >
          {console.log(`chatState messages`, props.chatState.messages)}
          {props.messages.map(message => {
            if (message) {
              autoScrollMessage();
            }
            return (
              <div className="chat_message" key={message.sentAt}>
                <p>{message.message}</p>
                <div ref={myRef}></div>
              </div>
            );
          })}
        </ChatBody>

        <ChatFooter
          id="chat_footer"
          style={{
            display: props.isMinimized ? 'none' : 'unset',
          }}
        >
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
