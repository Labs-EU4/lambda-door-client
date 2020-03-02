import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../Search/Search';
import { Button } from 'antd';
import styled from 'styled-components';
import { primaryGrey } from '../../../styles/theme.styles';

const AddAReviewNav = ({ searchVisible, setSearchVisible }) => {
  return (
    <AddReviewNavCon>
      {/* Searchbar */}
      <SearchForm
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
      />

      {/* Add a review button */}
      <Link exact="true" to="/add-review">
        <Button type="primary" icon="plus">
          Add a review
        </Button>
      </Link>
    </AddReviewNavCon>
  );
};

export default AddAReviewNav;

const AddReviewNavCon = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em 2em;
  align-items: center;
  background: ${primaryGrey};
  border-bottom: 1px solid #d6d6d6;
`;
