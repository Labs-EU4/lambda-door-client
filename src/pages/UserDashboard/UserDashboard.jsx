/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Spin } from 'antd';
import TopRatedList from '../../components/UserDashboard/TopRated/TopRatedList';
import ClosestLocationList from '../../components/UserDashboard/UserLocationComp/ClosestLocationList';
import JobTitleVisualization from '../../components/UserDashboard/JobTitleVisualization';
import { editProfile } from '../../state/actions/user';
import { getLocation } from '../../utils/getLocation';
import { LoginUser, SetAuthenticated } from '../../state/actions/auth';
import {
  getCompanyReviews,
  getInterviewReviews,
  getSalaryReviews,
} from '../../state/actions/reviews';
import { getCompanies } from '../../state/actions/companies';
import { getClosestCompanies } from '../../state/actions/closestCompanies';

export const UserDashboard = ({
  authState: {
    isLoading,
    credentials: { id, location },
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
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const token = localStorage.getItem('token');
      if (!code && !token) {
        history.push('/');
      }

      const getUserDetails = async () => {
        const {
          data: {
            user_id: userId,
            user: { name, email, image_1024: profilePicture },
          },
        } = await axios.get(
          `https://slack.com/api/oauth.access?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`
        );
        window.history.replaceState(null, null, window.location.pathname);
        const user = await LoginUser(userId, name, email, profilePicture);
        await getCompanyReviews(user);
        await getInterviewReviews(user);
        await getSalaryReviews(user);
        await getClosestCompanies(user);
        await getCompanies();
      };
      if (code) {
        await getUserDetails();
      }
    }

    start();
  }, [history, LoginUser, SetAuthenticated]);

  useEffect(() => {
    async function start() {
      const token = localStorage.getItem('token');

      if (token) {
        if (location === null) {
          await getLocation(id);
        }
      }
    }
    start();
  }, [location]);

  return isLoading ? (
    <StyledSpin>
      <Spin />
    </StyledSpin>
  ) : (
    <StyledContainer>
      <div className="top-layout">
        <div>
          <h2>Top Rated Companies</h2>
          <TopRatedList />
        </div>
        <div>
          <h2>Popular Job Roles</h2>
          <JobTitleVisualization />
        </div>
      </div>
      {location && (
        <div className="bottom-layout">
          <h2>Companies Near You</h2>
          <ClosestLocationList />
        </div>
      )}
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
})(UserDashboard);

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
    margin-bottom: 1.5rem;
  }
  .top-layout {
    display: flex;
    justify-content: space-between;
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

  .bottom-layout {
    margin-top: 3rem;
  }
`;
