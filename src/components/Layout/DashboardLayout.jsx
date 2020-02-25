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
                <AddAReviewNav />
                <Content
                  style={{
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
  @media ${tabletPortrait} {
    height: 100%;
  }

  .side-nav {
    @media ${mobilePortrait} {
      position: absolute;
      z-index: 1;
      height: 100vh;
    }
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
          height: 80px;
          padding: 1rem;
          background-color: #fafafa;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 100;
        }

        .trigger {
          border: none;
          .anticon.anticon-menu-fold {
            font-size: 1.3rem;
          }
          .anticon.anticon-menu-unfold {
            font-size: 1.3rem;
          }
        }
        .sign-out-btn {
          padding-right: 4em;
          color: ${textGrey};
          font-weight: 500;

          @media ${mobilePortrait} {
            display: none;
          }
        }
      }
    }

    .ant-layout-content {
      margin: 10px 16px;
      overflow-y: scroll;
    }
  }


/* // Aside 
  class="side-nav ant-layout-sider ant-layout-sider-dark"
  class="side-nav ant-layout-sider ant-layout-sider-dark ant-layout-sider-collapsed"

//UL
  class="ant-menu ant-menu-dark ant-menu-root ant-menu-inline"
  class="ant-menu ant-menu-dark ant-menu-inline-collapsed ant-menu-root ant-menu-vertical" */

  /* 

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
