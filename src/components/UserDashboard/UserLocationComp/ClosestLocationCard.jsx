/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Website = styled.a`
  position: absolute;
  top: 113px;
  left: 16px;
  z-index: 2;
  width: 300;
  overflow: hidden;
`;

const StyledP = styled.p`
  height: 40px !important;
  overflow: hidden !important;
`;

export default function ClosestLocationCard(props) {
  const { text, name, id, website } = props;
  return (
    <div className="cards">
      <Link to={`company-page/${id}`} className="nav-link">
        <div>
          <h3>{name}</h3>
          <StyledP>{text}</StyledP>
        </div>
        {/* <p style={{ marginBottom: 0 }}>Link: </p> */}
      </Link>
      <Website href={website} target="_blank" rel="noopener noreferrer">
        {website}
      </Website>
    </div>
  );
}
