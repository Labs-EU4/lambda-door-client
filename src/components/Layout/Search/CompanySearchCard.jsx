import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';

const CompanySearchCard = ({ history, name, location, website, type, id }) => {
  return (
    <StyledCard onClick={() => history.push(`/company-page/${id}`)}>
      <h2>{name}</h2>
      <p>{location}</p>
      <a href={website}>{website}</a>
      <p>
        Type: &nbsp;
        {type}
      </p>
    </StyledCard>
  );
};

export default CompanySearchCard;

const StyledCard = styled(Card)`
  height: 200px;
  width: 350px;
  margin-right: 1rem !important;
  margin-bottom: 1rem !important;
  &:hover {
    border: 2px solid #bb1333;
    cursor: pointer;
  }
`;
