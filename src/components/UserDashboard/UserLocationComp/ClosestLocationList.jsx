/* eslint-disable no-shadow */
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import CompanySummaryCard from '../../CompanySummaryCard';

export const ClosestLocationList = ({
  isFetching,
  closestCompanies: { closestCompanies },
}) => {
  return (
    <StyledContainer>
      {!isFetching ? (
        <>
          {closestCompanies.length !== 0 ? (
            closestCompanies.map(closest => (
              // eslint-disable-next-line react/no-array-index-key
              <CompanySummaryCard
                key={`${closest.id}`}
                text={closest.description}
                name={closest.name}
                id={closest.id}
                website={closest.website}
                rating={closest.rating}
              />
            ))
          ) : (
            <div className="empty-state">
              <p>No data to display</p>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <Spin />
        </div>
      )}
    </StyledContainer>
  );
};

export default connect(state => state, {})(ClosestLocationList);

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.5rem;
  min-height: 100%;
  position: relative;
  min-height: 150px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }

  .cards {
    position: relative;
    height: 150px;
    max-width: 350px;

    &:hover {
      border: 2px solid #bb1333;
    }
    a.nav-link {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      padding: 1rem;
      color: rgba(0, 0, 0, 0.65);
      border: 1px solid #e8e8e8;
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    h3 {
      font-weight: 600;
      font-size: 1rem;
    }

    .ant-rate,
    .ant-rate-star-first,
    .ant-rate-star-second {
      height: 20px;
      width: fit-content;
      display: inline-flex;
      align-items: center;
      justify-content: center;
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
