import React, { useState } from 'react';
import SearchForm from '../Search/Search';
import { Button } from 'antd';
import styled from 'styled-components';
import {
  primaryGrey,
} from '../../../styles/theme.styles';

const AddAReviewNav = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  // const toggleSearch = e => {
  //   e.stopPropagation();
  //   setSearchVisible(!searchVisible);
  // };

  return (
    <AddReviewNavCon>
      {/* Searchbar */}
      <SearchForm
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
      />

      {/* <SearchButton onClick={toggleSearch}>
          <Icon type="search" style={{ fontSize: '1.5rem', color: 'white' }} />
        </SearchButton> */}

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
  padding: 2em;
  align-items: center;
  background: ${primaryGrey};
  border-bottom: 1px solid #d6d6d6;
`;

// const SearchButton = styled.div`
//   background-color: #bb1333;
//   position: absolute;
//   bottom: 0.5rem;
//   right: 0.5rem;
//   border-radius: 50%;
//   height: 3rem;
//   width: 3rem;
//   display: none;
//   @media ${tabletPortrait} {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
//   @media ${mobilePortrait} {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }

//   .ant-icon {
//     color: white !important;
//   }
// `;