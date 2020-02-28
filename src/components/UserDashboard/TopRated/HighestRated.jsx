/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Spin, Button } from 'antd';
import TopRatedList from './TopRatedList';

import { editProfile } from '../../../state/actions/user';
import { LoginUser, SetAuthenticated } from '../../../state/actions/auth';
import {
  getCompanyReviews,
  getInterviewReviews,
  getSalaryReviews,
} from '../../../state/actions/reviews';
import { getCompanies } from '../../../state/actions/companies';
import { getClosestCompanies } from '../../../state/actions/closestCompanies';
import { getTopRatedReviews } from '../../../state/actions/topRatedReviews';

export const HighestRated = ({
  authState: {
    isLoading,
    credentials: { id },
  },
  topRatedReviews: { isFetching },
  LoginUser,
  SetAuthenticated,
  getCompanyReviews,
  getCompanies,
  history,
  getSalaryReviews,
  getClosestCompanies,
}) => {
  useEffect(() => {
    async function start() {
      await getTopRatedReviews();
    }

    start();
  }, [history, LoginUser, SetAuthenticated]);

  //   useEffect(() => {
  //     async function start() {
  //       const token = localStorage.getItem('token');

  //       if (token) {
  //         if (location === null) {
  //           await getLocation(id);
  //         }
  //       }
  //     }
  //     start();
  //   }, [location]);
  return isLoading ? (
    <StyledSpin>
      <Spin />
    </StyledSpin>
  ) : (
    <StyledContainer>
      <div className="top-layout">
        <div>
          <h2 style={{ color: 'dodgerblue' }}>
            Top Rated Companies
            <Button className="view-button" type="link">
              view all
            </Button>
          </h2>
          <TopRatedList color="dodgerblue" />
        </div>
      </div>
    </StyledContainer>
  );
};
export default connect(state => state, {
  LoginUser,
  SetAuthenticated,
  editProfile,
  getCompanyReviews,
  getCompanies,
  getSalaryReviews,
  getClosestCompanies,
  getTopRatedReviews,
})(HighestRated);

const StyledSpin = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled.div`
  @media (max-width: 1280px) {
    max-width: 800px;
    margin: 0 auto;
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
    justify-content: space-evenly;
    align-items: baseline;

    & > div {
      width: calc(50% - 1.5rem);

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
