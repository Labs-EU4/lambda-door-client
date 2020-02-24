import React, { useState } from 'react';
import SearchForm from '../Search/Search';
import { Button, Icon } from 'antd';
import styled from 'styled-components';
import { mobilePortrait, tabletPortrait } from '../../../styles/theme.styles';

const AddAReviewNav = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = e => {
    e.stopPropagation();
    setSearchVisible(!searchVisible);
  };

  return (
    <AddReviewNavCon>
      {/* Searchbar */}
      <div>
        <SearchForm
          searchVisible={searchVisible}
          setSearchVisible={setSearchVisible}
        />

        <SearchButton onClick={toggleSearch}>
          <Icon type="search" style={{ fontSize: '1.5rem', color: 'white' }} />
        </SearchButton>
      </div>
      {/* Add a review button */}
      <div>
        <Button>Add a review</Button>
      </div>
    </AddReviewNavCon>
  );
};

export default AddAReviewNav;

const AddReviewNavCon = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2em;
  align-items: center;
`;

const SearchButton = styled.div`
  /* background-color: #bb1333;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  display: none; */
  /* @media ${tabletPortrait} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media ${mobilePortrait} {
    display: flex;
    justify-content: center;
    align-items: center;
  } */

  /* .ant-icon {
    color: white !important;
  } */
`;
