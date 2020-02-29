/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Button, Icon } from 'antd';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TopRatedList from './TopRatedList';

import { getTopRatedReviews } from '../../../state/actions/topRatedReviews';

export const HighestRated = ({ LoginUser, SetAuthenticated, history }) => {
  useEffect(() => {
    async function start() {
      await getTopRatedReviews();
    }

    start();
  }, [history, LoginUser, SetAuthenticated]);

  return (
    <StyledContainer>
      <Button
        style={{
          marginBottom: '30px',
          border: '1px solid #BB1333',
          color: '#BB1333',
        }}
        onClick={() => history.goBack()}
      >
        <Icon type="left" />
        Back
      </Button>
      <div className="top-layout">
        <div>
          <h2 style={{ color: 'dodgerblue' }}>Top Rated Companies</h2>
          <TopRatedList color="dodgerblue" gridTemplate="repeat(2, 1fr)" />
        </div>
      </div>
    </StyledContainer>
  );
};
export default connect(state => state, {
  getTopRatedReviews,
})(HighestRated);

const StyledContainer = styled.div`
  @media (max-width: 1280px) {
    max-width: 800px;
  }

  @media (max-width: 768px) {
    max-width: 500px;
  }
  h2 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 2.5rem;
    margin-top: 2.5rem;
  }

  .view-button {
    color: grey;
  }
  .top-layout {
    display: flex;

    & > div {
      width: calc(100% - 1.5rem);

      @media (max-width: 1280px) {
        width: 100%;
        margin-bottom: 2rem;
      }
    }

    @media (max-width: 1280px) {
      flex-direction: column;
    }
  }
  .top-rated {
    color: dodgerblue;
  }

  .bottom-layout h2 {
    margin-top: 3rem;
  }
`;
