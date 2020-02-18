import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import CompanyReviewForm from '../../components/AddReview/CompanyReviewForm';
import SalaryReviewForm from '../../components/AddReview/SalaryReviewForm';
import InterviewReviewForm from '../../components/AddReview/InterviewReviewForm';

const { TabPane } = Tabs;
const AddReview = ({ history, location }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/');
    }
  }, []);

  return (
    <StyledContainer>
      <div>
        <h1>Leave a Review</h1>
        <Tabs defaultActiveKey={String(location.state)}>
          <TabPane tab="Company Review" key="0">
            <CompanyReviewForm />
          </TabPane>
          <TabPane tab="Salary Review" key="1">
            <SalaryReviewForm />
          </TabPane>
          <TabPane tab="Interview Process" key="2">
            <InterviewReviewForm />
          </TabPane>
        </Tabs>
      </div>
    </StyledContainer>
  );
};
export default AddReview;

const StyledContainer = styled.div`
  /* width: 90%;
  margin: 0 5%; */
`;
