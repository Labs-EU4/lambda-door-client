import React from 'react';
import { sendMessage } from '../../../state/actions/chat';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { Avatar, Icon, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ChatCon = styled.div`
  display: inline-block;
  /* position: fixed; */
  background: #fff;
  /* bottom: 0;
  right: 0; */
  margin-right: 2em;
  z-index: 5;
  max-width: 300px;
  width: 280px;
  height: 300px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  -webkit-box-shadow: -1px 0px 9px 0px rgba(235, 235, 235, 1);
  -moz-box-shadow: -1px 0px 9px 0px rgba(235, 235, 235, 1);
  box-shadow: -1px 0px 9px 0px rgba(235, 235, 235, 1);
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
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 7em;

  /* isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1; */

  /* document.getElementById('scroll').scrollTop = message.offsetHeight + message.offsetTop;  */

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
  }
`;

const Chat = ({
  chatState,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  sendMessage,
  authState: {
    credentials: { id },
  },
  messages,
  chatID,
}) => {
  const chatClick = (evt) => {};

  // const autoScrollMessage = () => {
  //   const chat_body = document.getElementById('chat_body');
  //   console.log(`chatBody`, chat_body);

  //   chat_body.scrollTop = chat_body.scrollHeight - chat_body.clientHeight;
  // }

  return (
    <>
      <ChatCon onClick={e => chatClick(e)}>
        <ChatHeader>
          <div className="top-chat">
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
              U
            </Avatar>
            <h4>User Name</h4>
          </div>
          <div className="chat_header_icon">
            <Icon
              type="message"
              style={{ fontSize: '22px', color: '#fff' }}
              theme="outlined"
            />
          </div>
        </ChatHeader>

        <ChatBody id="chat_body">
          {console.log(`chatState messages`, chatState.messages)}
          {messages.map(message => {
            // return <div ></div>;
            // if(message){
            //   autoScrollMessage()
            // }
            return (
              <div className="chat_message" key={message.sentAt}>
                <p>{message.message}</p>
              </div>
            );
          })}
        </ChatBody>

        <ChatFooter>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Type a message..."
              suffix={<SendOutlined />}
              name="message"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
              type="text"
              autoComplete="off"
            />
          </form>
        </ChatFooter>
      </ChatCon>
    </>
  );
};

const ChatForm = withFormik({
  mapPropsToValues: () => ({ message: '' }),

  // Custom sync validation
  validate: values => {
    const errors = {};

    if (!values.message) {
      errors.message = 'Required';
    }

    return errors;
  },

  handleSubmit: (values, { setSubmitting, setFieldValue, props }) => {
    props.sendMessage(
      values.message,
      props.chatID,
      props.authState.credentials.id
    );
    console.log(props.chatID);

    setFieldValue('message', '');
  },

  displayName: 'BasicForm',
})(Chat);

export default connect(state => state, { sendMessage })(ChatForm);
