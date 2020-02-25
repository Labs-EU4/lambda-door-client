/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import styled from 'styled-components';
import { Route, NavLink } from 'react-router-dom';
import { Button, Icon, Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import SideNav from './SideNav/SideNav';
import AddAReviewNav from './AddAReviewNav/AddAReviewNav';
import {
  primaryGrey,
  textGrey,
  mobilePortrait,
  tabletPortrait,
} from '../../styles/theme.styles';

import { LogoutUser } from '../../state/actions/auth';

import logo from '../../assets/lambda-logo.png';

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ component: Component, LogoutUser, ...rest }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  // const [visible, setVisible] = useState(false);
  // const hideDrawer = () => {
  //   setVisible(false);
  // };

  // const toggleDrawer = e => {
  //   e.stopPropagation();
  //   setVisible(!visible);
  // };

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
              >
                <div className="logo">
                  <img src={logo} alt="Lambda logo" className="lambda-logo" />
                  <h2>Lambda Door</h2>
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
              </Sider>
              <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                  <div className="header-content">
                    <Button type="button" className="trigger" onClick={toggle}>
                      <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Button>

                    <Button type="link" onClick={LogoutUser}>
                      Sign Out
                      <Icon type="right" />
                    </Button>
                  </div>
                </Header>
                <AddAReviewNav />
                <Content
                  style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                  }}
                >
                  <Component {...props} />
                </Content>
              </Layout>
            </Layout>

            {/* <StyledContainer>
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
                <AddAReviewNav />
                <div className="main-content">
                  <Component {...props} />
                </div>
              </div>
            </StyledContainer> */}
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

  .side-nav {
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2em 0 2em 0;
      .lambda-logo {
        max-width: 15%;
        height: auto;
      }
      h2 {
        color: #BB1333;
        padding-left: 1em;
        font-size: 1.1rem;
        font-weight: 600;
      }
    }
  }

  header.ant-layout-header {
      flex: 1 0 10%;
      background: blue;
    .header-content {
      display: flex;
      justify-content: space-between;
      .trigger {
        border: none;
        .anticon.anticon-menu-fold {
          font-size: 1.3rem;
        }
        .anticon.anticon-menu-unfold {
          font-size: 1.3rem;
        }
      }
    }
  }

/* class="anticon anticon-menu-fold" */


/* // Aside 
  class="side-nav ant-layout-sider ant-layout-sider-dark"
  class="side-nav ant-layout-sider ant-layout-sider-dark ant-layout-sider-collapsed"

//UL
  class="ant-menu ant-menu-dark ant-menu-root ant-menu-inline"
  class="ant-menu ant-menu-dark ant-menu-inline-collapsed ant-menu-root ant-menu-vertical" */
  /* @media ${tabletPortrait} {
    height: 100%;
  } */
  /* .main-container {
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
  } */
`;
