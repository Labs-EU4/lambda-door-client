/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import currencies from '../../../utils/currencies';

let salaryFormatted;

const SalarySearchCard = ({
  history,
  name,
  salary,
  job_title,
  currency,
  id,
}) => {
  const currencyUnit = currencies.find(curr => curr.name === currency).symbol;
  salaryFormatted = `${currencyUnit}${Number(salary)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

  return (
    <StyledCard onClick={() => history.push(`/search-results/salary/${id}`)}>
      <h2>{name}</h2>
      <p className="salary">
        {salaryFormatted}
        /yr
      </p>
      <p>{job_title}</p>
    </StyledCard>
  );
};

export default SalarySearchCard;

const StyledCard = styled(Card)`
  height: 200px;
  width: 350px;
  margin-right: 1rem !important;
  margin-bottom: 1rem !important;
  &:hover {
    border: 2px solid #bb1333;
    cursor: pointer;
  }

  .salary {
    font-size: 1.5rem;
  }
`;
