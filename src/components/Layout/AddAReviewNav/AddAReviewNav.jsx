import React, { useState } from 'react';
import SearchForm from '../Search/Search';
import { Button } from 'antd';
import styled from 'styled-components';
import {
  primaryGrey,
} from '../../../styles/theme.styles';

const AddAReviewNav = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <AddReviewNavCon>
      {/* Searchbar */}
      <SearchForm
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
      />

      {/* Add a review button */}
      <Button type="primary" icon="plus">
        Add a review
      </Button>
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
