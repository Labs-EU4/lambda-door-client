import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';

const InterviewSearchCard = ({ history, name, text, interest, id }) => {
  return (
    <StyledCard onClick={() => history.push(`/search-results/interview/${id}`)}>
      <h2>{name}</h2>
      <p>{interest}</p>
      <p>
        {text.slice(0, 100)}
        ...
      </p>
    </StyledCard>
  );
};

export default InterviewSearchCard;

const StyledCard = styled(Card)`
  height: 200px;
  width: 350px;
  height: 200px;
  width: 350px;
  margin-right: 1rem !important;
  margin-bottom: 1rem !important;
  &:hover {
    border: 2px solid #bb1333;
    cursor: pointer;
  }
`;
