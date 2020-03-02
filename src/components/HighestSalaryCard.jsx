/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Rate } from 'antd';
import styled from 'styled-components';

const StyledP = styled.p`
  height: 40px !important;
  overflow: hidden !important;
`;

export default function HighestSalaryCard(props) {
  const { job_title, salary, company, color } = props;
  console.log(props);

  return (
    <div className="cards">
      <Link to="highest/" className="nav-link">
        <div>
          <h3 style={{ color: color }}>{job_title}</h3>
          <StyledP>{company}</StyledP>
          <StyledP>${salary}</StyledP>
        </div>
      </Link>
    </div>
  );
}
