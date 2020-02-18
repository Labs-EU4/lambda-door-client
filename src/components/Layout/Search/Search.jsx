/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Input, Select, Form, Button, Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mobilePortrait, tabletPortrait } from '../../../styles/theme.styles';
import getSearchResults from '../../../state/actions/search';

const { Option } = Select;

const SearchForm = ({
  getSearchResults,
  history,
  searchVisible,
  setSearchVisible,
}) => {
  const [formValues, setFormValues] = useState({
    search_category: 'companies',
    search_query: '',
  });

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleComponentChange = name => {
    setFormValues({
      ...formValues,
      search_category: name,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    getSearchResults(formValues);
    setSearchVisible(false);
    history.push('/search-results');
  };

  const closeSearch = e => {
    e.preventDefault();
    setSearchVisible(false);
  };

  return (
    <StyledFormContainer searchVisible={searchVisible}>
      <Form>
        <div className="search-category">
          <Select
            name="search_category"
            defaultValue="companies"
            onChange={handleComponentChange}
            size="large"
          >
            <Option value="companies">Companies</Option>
            <Option value="salaries">Salaries</Option>
            <Option value="interviews">Interviews</Option>
          </Select>
        </div>
        <div className="search-field">
          <Input
            placeholder={
              formValues.search_category === 'companies'
                ? 'Company Name, Location'
                : formValues.search_category === 'salaries'
                ? 'Job Title, Location'
                : 'Company Name, Job Title'
            }
            size="large"
            name="search_query"
            onChange={handleChange}
          />
        </div>
        <Button onClick={handleSubmit} size="large">
          Search
        </Button>
        <CloseSearch onClick={closeSearch}>
          <Icon type="close" />
        </CloseSearch>
      </Form>
    </StyledFormContainer>
  );
};

export default withRouter(
  connect(state => state, { getSearchResults })(SearchForm)
);

const StyledFormContainer = styled.div`
  position: relative;
  .ant-form {
    max-width: 800px;
    width: 100%;
    display: flex;
    flex-direction: row;
    @media ${tabletPortrait} {
      position: fixed;
      left: 0;
      transition: all 0.25s linear;
      bottom: ${props => (props.searchVisible ? '0' : '-220px')};
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 180px;
      padding: 1rem 0;
    }
    @media ${mobilePortrait} {
      position: fixed;
      left: 0;
      transition: all 0.25s linear;
      bottom: ${props => (props.searchVisible ? '0' : '-220px')};
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 180px;
      padding: 1rem 0;
    }
    .ant-btn {
      margin-left: 1rem;
      @media ${mobilePortrait} {
        width: 90vw;
        margin-left: 0;
      }
    }
    .ant-input {
      width: 500px;
      background-color: #ffffff !important;
      @media ${tabletPortrait} {
        width: 90vw;
      }
      @media ${mobilePortrait} {
        width: 90vw;
      }
    }

    @media ${tabletPortrait} {
      display: flex;
      justify-content: space-between;
      background-color: grey;
      width: 100vw;
      z-index: 500;
    }
    @media ${mobilePortrait} {
      display: flex;
      justify-content: space-between;
      background-color: grey;
      width: 100vw;
      z-index: 500;
    }
    .search-category {
      min-width: 150px;
      margin-right: 1rem;
      @media ${tabletPortrait} {
        width: 90vw;
        margin-right: 0;
      }
      @media ${mobilePortrait} {
        width: 90vw;
        margin-right: 0;
      }
    }
    .mobile-logo-btn {
      display: none;
      @media ${tabletPortrait} {
        display: inherit;
        width: 50px;
        padding: 12px;
        img {
          width: 1.88rem;
        }
      }
      @media ${mobilePortrait} {
        display: inherit;
        width: 50px;
        padding: 12px;
        img {
          width: 1.88rem;
        }
      }
    }

    @media ${tabletPortrait} {
      background-color: #bb1333;
    }
    @media ${mobilePortrait} {
      background-color: #bb1333;
    }
  }
`;

const CloseSearch = styled.div`
  display: none;
  position: absolute;
  top: -1.5rem;
  right: 0;
  background-color: #bb1333;
  color: white;
  padding: 0.5rem;
  height: 2rem;
  width: 3rem;
  justify-content: center;
  align-items: center;
  border-radius: 1rem 0 0 0;

  @media ${tabletPortrait} {
    display: flex;
  }
  @media ${mobilePortrait} {
    display: flex;
  }
`;
