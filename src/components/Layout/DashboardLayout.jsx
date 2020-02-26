/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { Button, Icon, Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import AddAReviewNav from './AddAReviewNav/AddAReviewNav';
import {
  textGrey,
  mobilePortrait,
  tabletPortrait,
} from '../../styles/theme.styles';

import { LogoutUser } from '../../state/actions/auth';

import logo from '../../assets/lambda-logo.png';

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ component: Component, LogoutUser, ...rest }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const toggleSearch = evt => {
    evt.stopPropagation();
    setSearchVisible(!searchVisible);
  };

  return (
    <Route
      {...rest}
      render={props => {
        return (
          <StyledContainer>
            <Layout>
              <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="side-nav"
                collapsedWidth={
                  window.screen.width >= 1024 && window.screen.height >= 768
                    ? 80
                    : 0
                }
              >
                <div className="logo">
                  <img
                    src={logo}
                    alt="Lambda logo"
                    className="lambda-logo"
                    style={{ maxWidth: collapsed ? '30%' : '15%' }}
                  />
                  <h2 style={{ display: collapsed ? 'none' : 'initial' }}>
                    Lambda Door
                  </h2>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1">
                    <Icon type="home" />
                    <span>Home</span>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Icon type="file-done" />
                    <span>Reviews</span>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Icon type="snippets" />
                    <span>My Reviews</span>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Icon type="user" />
                    <span>User Profile</span>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Icon type="setting" />
                    <span>Account Settings</span>
                  </Menu.Item>
                </Menu>

                <Button
                  type="link"
                  onClick={LogoutUser}
                  className="side-logout"
                >
                  Sign Out
                  <Icon type="right" />
                </Button>
              </Sider>
              <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                  <div className="header-content">
                    <Button type="button" className="trigger" onClick={toggle}>
                      <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Button>

                    <img src={logo} alt="Lambda logo" className="mobile-logo" />

                    <Button
                      type="link"
                      onClick={LogoutUser}
                      className="sign-out-btn"
                    >
                      Sign Out
                      <Icon type="right" />
                    </Button>
                  </div>
                </Header>
                <AddAReviewNav
                  searchVisible={searchVisible}
                  setSearchVisible={setSearchVisible}
                />
                <Content
                  style={{
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                  }}
                >
                  <Component {...props} />
                  <SearchButton onClick={toggleSearch}>
                    <Icon
                      type="search"
                      style={{ fontSize: '1.5rem', color: 'white' }}
                    />
                  </SearchButton>
                </Content>
              </Layout>
            </Layout>
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

  .side-nav {
    z-index: 100;
    @media ${mobilePortrait} {
      position: absolute;
      height: 100vh;
      padding-top: 4.5em;
    }
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2em 0 2em 0;

      @media ${mobilePortrait} {
        display: none;
      }

      .lambda-logo {
        height: auto;
      }
      h2 {
        color: #bb1333;
        padding-left: 1em;
        font-size: 1.1rem;
        font-weight: 600;
      }
    }

    .side-logout {
      color: rgba(255, 255, 255, 0.65);
      margin-left: 0.8em;
      margin-top: 3em;
      display: none;

      @media ${mobilePortrait} {
        display: unset;
      }
    }
  }

  .ant-layout {
    width: calc(100% - 250px);
    height: 100vh;
    overflow: hidden;

    @media ${mobilePortrait} {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    header.ant-layout-header {
      display: flex;
      align-items: center;

      .header-content {
        display: flex;
        justify-content: space-between;
        width: 100%;

        @media ${mobilePortrait} {
          padding: 1rem;
          background-color: #fafafa;
          width: 100%;
          z-index: 100;
        }

        .trigger {
          border: none;
          background: none;
          .anticon.anticon-menu-fold {
            font-size: 1.3rem;

            @media ${mobilePortrait} {
              font-size: 1.8rem;
            }
          }
          .anticon.anticon-menu-unfold {
            font-size: 1.3rem;
            @media ${mobilePortrait} {
              font-size: 1.8rem;
            }
          }
        }

        .mobile-logo {
          width: 8%;
          max-width: 100%;
          height: 100%;
          display: none;

          @media ${mobilePortrait} {
            display: unset;
            margin-right: 1em;
          }
        }

        .sign-out-btn {
          padding-right: 4em;
          color: ${textGrey};
          font-weight: 500;

          @media ${mobilePortrait} {
            display: none;
          }

          &:hover {
            color: #bb1333;
          }
        }
      }
    }

    .ant-layout-content {
      margin: 10px 16px;
      overflow-y: scroll;
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
