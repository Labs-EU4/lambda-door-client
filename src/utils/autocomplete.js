/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
import { Form, Input, AutoComplete, Button } from 'antd';
import AddCompanyModal from '../components/AddReview/AddCompanyModal';

const { Option } = AutoComplete;

const renderOption = Item => {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Option key={Item.name} text={Item.name}>
      <p>{Item.name}</p>
    </Option>
  );
};

const AutoCompleted = ({ label, dataSource, placeholder, onChange }) => {
  const [addingCompany, setAddingCompany] = useState(false);
  const [value, setValue] = useState('');

  const options = dataSource.map(renderOption).concat([
    <Option key="all" value="" className="show-all">
      <Button type="button" onClick={() => setAddingCompany(true)}>
        Add Company
      </Button>
    </Option>,
  ]);

  return (
    <>
      <AddCompanyModal
        visible={addingCompany}
        setAddingCompany={setAddingCompany}
        value={value}
      />
      <Form.Item label={label}>
        <AutoComplete
          className="certain-category-search"
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={false}
          dropdownStyle={{ width: 300 }}
          size="default"
          style={{ width: '100%' }}
          dataSource={options}
          optionLabelProp="value"
          filterOption={(inputValue, option) => {
            if (
              option.key.toLowerCase().includes(inputValue.toLowerCase()) ||
              option.key.toLowerCase() === 'all'
            ) {
              return true;
            }
            return false;
          }}
          onChange={e => {
            if (e) {
              onChange(e);
              setValue(e);
            }
          }}
        >
          <Input size="default" placeholder={placeholder} />
        </AutoComplete>
      </Form.Item>
    </>
  );
};

export default AutoCompleted;
