/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import styled from 'styled-components';
import { Route, NavLink } from 'react-router-dom';
import { Button, Icon } from 'antd';
import { connect } from 'react-redux';
import SideNav from './SideNav/SideNav';
import SearchForm from './Search/Search';
import {
  primaryGrey,
  textGrey,
  mobilePortrait,
  tabletPortrait,
} from '../../styles/theme.styles';

import { LogoutUser } from '../../state/actions/auth';

import logo from '../../assets/lambda-logo.png';

const DashboardLayout = ({ component: Component, LogoutUser, ...rest }) => {
  const [visible, setVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const hideDrawer = () => {
    setVisible(false);
  };

  const toggleDrawer = e => {
    e.stopPropagation();
    setVisible(!visible);
  };
  const toggleSearch = e => {
    e.stopPropagation();
    setSearchVisible(!searchVisible);
  };
  return (
    <Route
      {...rest}
      render={props => {
        return (
          <StyledContainer>
            <SideNav visible={visible} />
            <div className="main-container" onClick={hideDrawer}>
              <div className="top-bar">
                <button
                  type="button"
                  className="mobile-logo-btn"
                  onClick={e => toggleDrawer(e)}
                >
                  <img className="lambda-logo" src={logo} alt="Lambda logo" />
                  <Icon type="menu" className="hamburger" />
                </button>
                <SearchForm
                  searchVisible={searchVisible}
                  setSearchVisible={setSearchVisible}
                />
                <div className="sign-out-btn">
                  <Button type="link" onClick={LogoutUser}>
                    Sign Out
                    <Icon type="right" />
                  </Button>
                </div>
                <NavLink
                  exact
                  to="/dashboard"
                  className="link"
                  activeClassName="active"
                >
                  <img
                    className="right-hand-logo"
                    src={logo}
                    alt="Lambda logo"
                  />
                </NavLink>
              </div>
              <div className="main-content">
                <Component {...props} />
              </div>
            </div>
            <SearchButton onClick={toggleSearch}>
              <Icon
                type="search"
                style={{ fontSize: '1.5rem', color: 'white' }}
              />
            </SearchButton>
          </StyledContainer>
        );
      }}
    />
  );
};

export default connect(null, { LogoutUser })(DashboardLayout);

const StyledContainer = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  @media ${tabletPortrait} {
    height: 100%;
  }
  .main-container {
    width: calc(100% - 250px);
    height: 100vh;
    overflow: hidden;
    @media ${mobilePortrait} {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .top-bar {
      width: 100%;
      padding: 1.5rem 1.5rem 2.5rem 0;
      background: ${primaryGrey};
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media ${mobilePortrait} {
        height: 80px;
        padding: 1rem;
        background-color: #fafafa;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 100;
      }
      .mobile-logo-btn {
        display: none;
        border: none;
        outline: none;
        background: transparent;
        @media ${mobilePortrait} {
          display: inherit;
          width: 50px;
          margin-right: 0.75rem;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: none;
          }
          .hamburger {
            display: none;
            @media ${mobilePortrait} {
              display: block;
              font-size: 1.9rem;
              color: #bb1333;
            }
          }
        }
      }
      .right-hand-logo {
        display: none;
        @media ${mobilePortrait} {
          display: block;
          width: 2.9rem;
          padding-right: 1rem;
          max-height: 2.9rem;
        }
      }
      .ant-input {
        background: transparent;
      }
      .ant-input-affix-wrapper {
        font-size: 18px;
      }
      .ant-btn-link {
        color: ${textGrey};
        font-weight: 500;
      }
    }
    .main-content {
      padding: 2rem 1.5rem;
      height: calc(100vh - 70px);
      overflow-y: auto;
      @media ${mobilePortrait} {
        padding-top: 100px;
      }
    }
    .sign-out-btn {
      @media ${mobilePortrait} {
        display: none;
      }
    }
    .empty-state {
      min-height: 300px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      max-width: 100%;
    }
    .footer {
      display: none;
      background-color: ${primaryGrey};
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      text-align: center;
      height: 70px;
    }
  }
`;

const SearchButton = styled.div`
  background-color: #bb1333;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  display: none;
  @media ${tabletPortrait} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media ${mobilePortrait} {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-icon {
    color: white !important;
  }
`;
