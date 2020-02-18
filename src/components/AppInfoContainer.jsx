/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import {
  tabletPortrait,
  mobilePortrait,
  mobileLandscape,
  tabletPortraitLarge,
} from '../styles/theme.styles';

function AppInfoContainer({ infoVisible, hideInfo }) {
  return (
    <StyledDiv infoVisible={infoVisible}>
      <TextBox>
        <div className="heading">
          <h2>Features</h2>
        </div>
        <InfoBox>
          <p className="left-outer">
            <Icon type="slack-circle" theme="filled" className="icon" />
            No need to sign up: Lambda students have automatic access. Just sign
            in via Slack.
          </p>
          <p className="left-center">
            <Icon type="edit" theme="filled" className="icon" />
            Leave company reviews, salary reviews and interview reviews,
            publicly or anonymously.
          </p>
          <p className="right-center">
            <Icon type="info-circle" theme="filled" className="icon" />
            Access up to date information about companies in your area or around
            the world.
          </p>
          <p className="right-outer">
            <Icon type="mail" theme="filled" className="icon" />
            Email referrals: ask questions at the click of a button about the
            companies you're interested in.
          </p>
        </InfoBox>
        <a className="back-link" onClick={hideInfo}>
          Go back &nbsp;
          <Icon
            type="up-circle"
            theme="filled"
            style={{ fontSize: 22, color: '#bb1333' }}
            onClick={hideInfo}
          />
        </a>
      </TextBox>
    </StyledDiv>
  );
}

export default AppInfoContainer;

const StyledDiv = styled.div`
  position: absolute;
  background-color: #bb1333;
  transition: all 0.2s ease-in-out;
  top: ${props => (props.infoVisible ? `0%` : `100%`)};
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${tabletPortrait} {
    background: #ffffff;
  }
  @media ${mobileLandscape} {
    background: #ffffff;
    height: 850px;
    top: ${props => (props.infoVisible ? `0%` : `-850px`)};
  }
  @media ${mobilePortrait} {
    background: #ffffff;
    height: 1000px;
    top: ${props => (props.infoVisible ? `0%` : `-1000px`)};
    width: 100%;
  }
`;

const TextBox = styled.div`
  width: 80%;
  height: 600px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  @media only screen and (max-width: 1270px) {
    padding: 1rem;
  }
  @media ${mobileLandscape} {
    height: 700px;
  }
  @media ${tabletPortraitLarge} {
    height: 1000px;
    padding: 1rem;
  }

  h2 {
    font-size: 35px;
    font-family: 'Roboto';
    margin-bottom: 0;
    text-align: center;
    @media ${mobilePortrait} {
      padding-top: 50px;
      padding-bottom: 30px;
    }
  }
  .back-link {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    font-size: 20px;
    margin-top: 30px;
    @media ${mobileLandscape} {
      margin-top: 0;
    }
    @media ${mobilePortrait} {
      margin-top: -20px;
      justify-content: center;
    }
  }
  @media ${mobilePortrait} {
    width: 98%;
    padding: 0;
    height: 1200px;
  }
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  @media only screen and (max-width: 1270px) {
    padding: 0;
  }
  @media ${tabletPortraitLarge} {
    flex-wrap: wrap;
    height: 800px;
    width: 90%;
    padding: 2rem;
  }
  @media ${tabletPortrait} {
    padding: 0;
    width: 110%;
    flex-wrap: wrap;
  }
  @media ${mobileLandscape} {
    height: 800px;
    flex-wrap: wrap;
  }
  @media ${mobilePortrait} {
    padding: 0;
    width: 100%;
    flex-direction: column;
  }

  p {
    width: 25%;
    height: 200px;
    padding: 2rem;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    margin-top: 100px;
    @media only screen and (max-width: 1270px) {
      padding: 1rem;
    }

    @media ${tabletPortraitLarge} {
      width: 50%;
      padding: 2rem;
    }
    @media ${tabletPortrait} {
      width: 50%;
      height: 170px;
      padding: 0.5rem;
    }
    @media ${mobilePortrait} {
      width: 100%;
      margin-top: 0;
      height: 180px;
    }
    @media ${mobileLandscape} {
      width: 65%;
      height: 155px;
      margin-top: 5px;
    }
  }

  @media ${tabletPortrait} {
    flex-wrap: wrap;
  }

  .left-outer {
    border-right: 1px solid grey;
    .icon {
      font-size: 30px !important;
    }
    @media ${mobilePortrait} {
      border-right: none;
    }
  }

  .left-center {
    border-right: 1px solid grey;
    .icon {
      font-size: 30px !important;
      @media ${mobileLandscape} {
        padding-bottom: 1.8rem;
      }
    }
    @media ${tabletPortraitLarge} {
      border-right: none;
    }
    @media ${tabletPortrait} {
      border-right: none;
    }
    @media ${mobileLandscape} {
      border-right: none;
    }
    @media ${mobilePortrait} {
      border-right: none;
    }
  }

  .right-center {
    border-right: 1px solid grey;
    .icon {
      font-size: 30px !important;
    }
    @media ${mobilePortrait} {
      border-right: none;
    }
  }

  .right-outer {
    .icon {
      font-size: 30px !important;
      @media only screen and (max-width: 1270px) {
        padding-bottom: 2rem;
      }
      @media ${mobileLandscape} {
        padding-bottom: 0;
      }
      @media ${tabletPortraitLarge} {
        padding-bottom: 0.4rem;
      }
      @media ${tabletPortrait} {
        padding-bottom: 2.5rem;
      }
    }
  }
`;
