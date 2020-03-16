/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import HighestSalaryCard from '../../HighestSalaryCard';
import { getHighestSalary } from '../../../state/actions/highestSalaries';

export const TopRatedSalary = ({
  isFetching,
  getHighestSalary,
  highestSalaries: { highestSalaries },
  authState: {
    credentials: { location },
  },
  color,
}) => {
  useEffect(() => {
    getHighestSalary();
  }, []);
  console.log(`highestSalaries`, highestSalaries);

  return (
    <StyledDiv>
      {!isFetching ? (
        <>
          {highestSalaries.length === 0 ? (
            <div className="empty-state">
              <p>No data to display</p>
            </div>
          ) : !location ? (
            highestSalaries
              .slice(0, 4)
              .map((topRated, index) => (
                <HighestSalaryCard
                  key={index}
                  company={topRated.companyName}
                  job_title={topRated.job_title}
                  salary={`${topRated.base_salary}`}
                  color={color}
                />
              ))
          ) : (
            highestSalaries.slice(0, 4).map((topRated, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <HighestSalaryCard
                key={index}
                company={topRated.companyName}
                job_title={topRated.job_title}
                salary={`${topRated.base_salary}`}
                color={color}
              />
            ))
          )}
        </>
      ) : (
        <div className="empty-state">
          <Spin />
        </div>
      )}
    </StyledDiv>
  );
};

export default connect(state => state, { getHighestSalary })(TopRatedSalary);

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1.5rem;
  position: relative;
  min-height: 300px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }

  .cards {
    position: relative;
    height: 150px;
    max-width: 505px;

    a {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      padding: 1rem;
      color: rgba(0, 0, 0, 0.65);
      border: 1px solid #e8e8e8;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &:hover {
        border: 1px solid #bb1333;
      }
    }

    p {
      height: 40px;
      overflow: hidden;
    }

    h3 {
      font-weight: 600;
      font-size: 1rem;
    }

    .ant-rate,
    .ant-rate-star-first,
    .ant-rate-star-second {
      height: 20px;
      /* width: fit-content;
      display: inline-flex;
      align-items: center;
      justify-content: center; */
    }

    .ant-rate-star-first i,
    .ant-rate-star-second i {
      font-size: 14px;
    }

    .ant-rate-star:not(:last-child) {
      margin-right: 3px;
    }
  }
`;
