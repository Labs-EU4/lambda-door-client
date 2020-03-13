import React from 'react';
import { sendMessage } from '../../../state/actions/chat';
import { withFormik } from 'formik';
import { connect } from 'react-redux';

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
  const chatClick = e => {};

  return (
    <>
      <div
        style={{
          margin: '5px',
          background: '#ccc',
          width: '300px',
          height: '300px',
          display: 'inline-block',
        }}
        onClick={e => chatClick()}
      >
        {messages.map(message => {
          return <div key={message.sentAt}>{message.message}</div>;
        })}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.message}
            name="message"
          />
          {/* {errors.message && touched.message && (
              <div id="feedback">{errors.message}</div>
            )} */}
          {/* <button type="submit">Submit</button> */}
        </form>
      </div>
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
