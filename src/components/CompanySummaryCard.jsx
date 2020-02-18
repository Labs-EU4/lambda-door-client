/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Rate } from 'antd';
import styled from 'styled-components';

const Website = styled.a`
  z-index: 2;
  overflow: hidden;
`;

const StyledP = styled.p`
  height: 40px !important;
  overflow: hidden !important;
`;

const CardBottom = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  padding: 1rem;
  justify-content: space-between;
`;

export default function CompanySummaryCard(props) {
  const { text, name, id, website, rating } = props;
  return (
    <div className="cards">
      <Link to={`company-page/${id}`} className="nav-link">
        <div>
          <h3>{name}</h3>
          <StyledP>{text}</StyledP>
        </div>
        {/* <p style={{ marginBottom: 0 }}>Link: </p> */}
      </Link>

      <CardBottom>
        <div>
          {rating && (
            <Rate
              disabled
              allowHalf
              defaultValue={Math.round(rating * 10) / 10}
            />
          )}
        </div>
        <div>
          {website && (
            <Website href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </Website>
          )}
        </div>
      </CardBottom>
    </div>
  );
}
