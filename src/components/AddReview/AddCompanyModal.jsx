/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Form, Input, Icon, Button, Select } from 'antd';
import { addCompany } from '../../state/actions/companies';
import LocationSearch from '../LocationSearch';
import openNotification from '../../utils/openNotification';

const { Option } = Select;

const AddCompanyModal = props => {
  const {
    visible,
    setAddingCompany,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
  } = props;

  const handleClose = () => {
    setAddingCompany(false);
  };

  return (
    <Modal
      title="Add A Company"
      visible={visible}
      onCancel={handleClose}
      footer={[
        <Button key="back" onClick={handleClose}>
          Cancel
        </Button>,
      ]}
    >
      <form onSubmit={handleSubmit}>
        <Form.Item
          help={touched.name && errors.name ? errors.name : ''}
          validateStatus={touched.name && errors.name ? 'error' : undefined}
        >
          <Input
            size="large"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Company Name"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Form.Item>

        <Form.Item
          help={touched.location && errors.location ? errors.location : ''}
          validateStatus={
            touched.location && errors.location ? 'error' : undefined
          }
        >
          <LocationSearch
            name="location"
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Location"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Form.Item>
        <Form.Item
          help={touched.website && errors.website ? errors.website : ''}
          validateStatus={
            touched.website && errors.website ? 'error' : undefined
          }
        >
          <Input
            size="large"
            name="website"
            value={values.website}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Website"
            prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Form.Item>
        <Form.Item
          help={touched.type && errors.type ? errors.type : ''}
          validateStatus={touched.type && errors.type ? 'error' : undefined}
        >
          <Select
            name="type"
            value={values.type}
            placeholder="Company Type"
            onChange={value => {
              const event = { ...document.createEvent('Event') };
              event.target = {};
              event.target.name = 'type';
              event.target.value = value;
              handleChange(event);
            }}
            onBlur={handleBlur}
          >
            {[
              'Company - Public',
              'Company - Private',
              'Contract',
              'Franchise',
              'Subsidiary or Business Segment',
              'Hospital',
              'Private Practice',
              'School',
              'College',
              'Government',
              'Self Employed',
              'Other',
            ].map((elem, idx) => {
              return (
                <Option key={idx} value={elem}>
                  {elem}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          help={
            touched.description && errors.description ? errors.description : ''
          }
          validateStatus={
            touched.description && errors.description ? 'error' : undefined
          }
        >
          <Input.TextArea
            size="large"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Description"
            prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Add Company
        </Button>
      </form>
    </Modal>
  );
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Please provide a name'),
  location: yup.string().required('Please provide a location'),
  website: yup
    .string()
    .url('Please enter a valid URL')
    .required('Please provide a website'),
  type: yup.string().required('Please provide a company type'),
  description: yup.string().required('Please provide a description'),
});

const CompanyModal = withFormik({
  mapPropsToValues: props => {
    return {
      name: props.value,
      location: '',
      website: '',
      description: '',
      latitude: '',
      longitude: '',
    };
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    props.addCompany(values);
    props.setAddingCompany(false);
    openNotification('Company Added Successfully!');
    setSubmitting(false);
  },
  validationSchema: validationSchema,
  enableReinitialize: true,
})(AddCompanyModal);

export default connect(state => state, { addCompany })(CompanyModal);
