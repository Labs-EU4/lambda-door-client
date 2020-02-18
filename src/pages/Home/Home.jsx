/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Typography, Alert } from 'antd';
import styled from 'styled-components';
import decode from 'jwt-decode';

import { connect } from 'react-redux';
import { LoginUser, SetAuthenticated } from '../../state/actions/auth';
import Footer from '../../components/Layout/FooterNav/FooterNav';

import {
  tabletPortrait,
  tabletPortraitLarge,
  tabletLandscape,
  mobileLandscape,
  mobilePortrait,
  FlexFunc,
} from '../../styles/theme.styles';
import Logo from '../../components/Layout/SideNav/Logo';
import background from '../../assets/lambda-door-lp-vector.svg';
import AppInfoContainer from '../../components/AppInfoContainer';

const { Title, Paragraph } = Typography;

// eslint-disable-next-line no-shadow
export const Home = ({ history, SetAuthenticated }) => {
  const [error, setError] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);

  const viewInfo = () => {
    setInfoVisible(true);
  };

  const hideInfo = () => {
    setInfoVisible(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { id } = decode(token);
      SetAuthenticated(id);
      history.push('/dashboard');
    }
  }, [history, SetAuthenticated]);

  return (
    <div>
      <HomeContainer infoVisible={infoVisible}>
        <HomeContentContainer>
          <div className="logo-div">
            <Logo />
          </div>
          <OnboardingContainer>
            <Title className="siteTitle">Lambda Door</Title>
            <Paragraph>
              The one-stop portal for Lambda graduates looking for company
              information in the quest for a job. &nbsp;
              <a title="Learn more" onClick={viewInfo}>
                <span>Learn more</span>
              </a>
            </Paragraph>
            <a
              href={`https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}
            >
              <img
                alt="Sign in with Slack"
                height="40"
                width="172"
                src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
                srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
              />
            </a>
            {error && (
              <Alert
                message="An error occured while signing in!!"
                type="error"
                showIcon
                closable
                style={{
                  fontSize: '16px',
                  marginTop: '10px',
                  width: '100%',
                  maxWidth: '300px',
                }}
                onClose={() => setError(null)}
              />
            )}
          </OnboardingContainer>
          <Paragraph style={{ color: 'white' }} className="tag-paragraph">
            Built by Lambda students, for Lambda students.
          </Paragraph>
        </HomeContentContainer>
      </HomeContainer>
      <AppInfoContainer infoVisible={infoVisible} hideInfo={hideInfo} />
      <Footer className="footer" />
    </div>
  );
};

export default connect(null, { LoginUser, SetAuthenticated })(Home);

const HomeContainer = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-position: top right;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;

  @media ${tabletPortrait} {
    background-position: -180px 50px;
  }
  @media ${tabletLandscape} {
    background-position: bottom left;
  }
  @media ${mobileLandscape} {
    background-image: none;
  }
  @media ${mobilePortrait} {
    background-image: none;
    display: flex;
    flex-direction: column;
  }
`;

const HomeContentContainer = styled.div`
  ${FlexFunc('column', 'flex-start')};
  height: 100%;
  width: 50%;
  padding: 1% 10%;

  .tag-paragraph {
    display: none;
  }

  .logo-div {
    @media ${mobilePortrait} {
      z-index: 1;
      padding-top: 10px;
      .img {
        position: sticky;
        top: 0;
      }
    }
  }
  @media (max-width: 480px) {
    .tag-paragraph {
      display: block;
      margin-bottom: 80px;
    }
    ${FlexFunc('column', 'space-between', 'flex-start')};
  }
  @media ${tabletPortrait} {
    align-items: center;
    width: 100%;
    padding: 5% 5%;
  }
  @media ${tabletLandscape} {
    align-items: center;
    width: 100%;
    padding: 5% 5%;
  }
  @media ${mobilePortrait} {
    text-align: center;
    font-size: 12px;
    width: 100%;
  }
  @media ${mobileLandscape} {
    text-align: center;
    color: black;
    padding: 2% 5%;
  }
`;

const OnboardingContainer = styled.div`
  padding-bottom: 10%;
  ${FlexFunc('column', 'space-between', 'flex-start')};
  h1 {
    font-weight: 500;
    font-size: 64px;
    line-height: 64px;
    font-family: 'Roboto', san-serif;
    margin-bottom: 10px;

    @media ${tabletPortraitLarge} {
      padding-top: 60px;
    }
  }
  span {
    position: relative;
    left: -6px;
  }
  div {
    font-size: 20px;
    line-height: 32px;
    @media only screen and (max-width: 1270px) {
      width: 300px;
    }
    @media ${mobileLandscape} {
      width: 400px;
    }
    @media ${mobilePortrait} {
      width: 100%;
    }
  }

  margin-top: 30%;
  @media (max-width: 705px) {
    margin-top: 0;
  }
  @media ${tabletPortrait} {
    align-items: center;
    width: 100%;
    text-align: center;
    padding: 0 5%;
    display: flex;
    flex-direction: column;
    margin-top: 15%;
  }
  @media ${tabletLandscape} {
    align-items: center;
    width: 100%;
    text-align: center;
    padding: 0 20%;
    margin-top: 5%;
  }
  @media ${mobilePortrait} {
    padding-bottom: 50px;
    align-items: center;
    h1 {
      font-size: 32px;
      line-height: 48px;
    }
    div {
      font-size: 16px;
      line-height: 24px;
      display: flex;
      flex-direction: column;
    }
  }
  @media ${mobileLandscape} {
    h1 {
      font-size: 32px;
      line-height: 48px;
    }
    div {
      font-size: 16px;
      line-height: 24px;
    }
  }
`;
