import React from 'react';
import styled from 'styled-components';
import { mobileLandscape, mobilePortrait } from '../../../styles/theme.styles';
import logo from '../../../assets/lambda-logo.png';

// eslint-disable-next-line react/prop-types
const Logo = ({ smaller }) => {
  return (
    <LogoContainer className={smaller ? 'is-smaller' : null}>
      <img src={logo} alt="Lambda School" />
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.div`
  width: 2.5rem;

  @media ${mobilePortrait} {
    width: 2rem;
  }

  @media ${mobileLandscape} {
    width: 2.5rem;
  }

  &.is-smaller {
    width: 2rem;

    @media ${mobilePortrait} {
      width: 1.5rem;
    }

    @media ${mobileLandscape} {
      width: 2rem;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
