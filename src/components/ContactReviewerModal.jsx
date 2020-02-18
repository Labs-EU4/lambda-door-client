/* eslint-disable camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';
import axios from 'axios';
import { Modal, Form, Input, Icon, Button, Select } from 'antd';
import openNotification from '../utils/openNotification';

function ContactReviewer({
  open,
  setOpen,
  visible,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  touched,
  errors,
  loading,
}) {
  return (
    <Modal
      title="Referral Form"
      visible={open}
      onCancel={() => setOpen(false)}
      footer={[<Button key="back">Cancel</Button>]}
    >
      <form onSubmit={handleSubmit}>
        <Form.Item
          help={
            touched.description && errors.description ? errors.description : ''
          }
          validateStatus={
            touched.description && errors.description ? 'error' : undefined
          }
        >
          <Input.TextArea
            rows={5}
            size="large"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your Message Here"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Form.Item>
        <Button htmlType="submit" type="secondary" loading={loading}>
          Send Message
        </Button>
      </form>
    </Modal>
  );
}

const validationSchema = yup.object().shape({
  description: yup.string().required('Please ask your question'),
});

const ContactReviewerModal = withFormik({
  mapPropsToValues: () => ({
    description: '',
  }),
  handleSubmit: async (values, { props, setSubmitting }) => {
    const {
      authState: {
        credentials: { email_address: senderEmail, full_name },
      },
      email: recipientEmail,
      setLoading,
    } = props;
    setLoading(true);
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/referral/`, {
      senderEmail,
      recipientEmail,
      name: full_name,
      description: values.description,
    });
    setLoading(false);
    props.setOpen(false);
    openNotification('Message Sent Successfully!');
    setSubmitting(false);
  },
  validationSchema: validationSchema,
})(ContactReviewer);
export default connect(state => state)(ContactReviewerModal);
