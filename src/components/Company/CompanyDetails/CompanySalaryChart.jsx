/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import uuid from 'uuid';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { connect } from 'react-redux';
import { mobilePortrait } from '../../../styles/theme.styles';
import { Spin } from 'antd';
import { getAvgSalaries } from '../../../state/actions/avgSalaries';

const startingData = [
  { interest: 'Front End', id: uuid(), avg: 0, currency: 'USD' },
  { interest: 'Back End', id: uuid(), avg: 0, currency: 'USD' },
  { interest: 'Full Stack', id: uuid(), avg: 0, currency: 'USD' },
  { interest: 'Data Science', id: uuid(), avg: 0, currency: 'USD' },
  { interest: 'Machine Learning', id: uuid(), avg: 0, currency: 'USD' },
  { interest: 'User Experience', id: uuid(), avg: 0, currency: 'USD' },
  { interest: 'Mobile Development', id: uuid(), avg: 0, currency: 'USD' },
  { interest: 'Product Manager', id: uuid(), avg: 0, currency: 'USD' },
];

const COLOURS = [
  '#1E5896',
  '#ABE7DD',
  '#368DA7',
  '#EBEBCE',
  '#6ABAC5',
  '#BAD38F',
  '#83D0BC',
  '#0C3C78',
  '#D2E3D0',
];

function CustomizedAxisTick(props) {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={0}
        textAnchor="end"
        fill="#666"
        transform="rotate(-90)"
      >
        {payload.value}
      </text>
    </g>
  );
}

const CompanySalaryChart = ({ isFetching, getAvgSalaries, avgSalaries }) => {
  const { id } = useParams();
  const [state, setState] = useState([]);

  useEffect(() => {
    getAvgSalaries(id);
  }, []);

  useEffect(() => {
    const averages = [...avgSalaries.avgSalaries];

    startingData.forEach(item => {
      const index = averages.findIndex(e => e.interest === item.interest);

      if (index === -1) {
        averages.push(item);
      }
    });

    setState(
      averages.map(item => {
        return {
          ...item,
          avg: parseInt(item.avg, 10),
        };
      })
    );
  }, [avgSalaries]);

  return (
    <StyledDiv>
      <h3>
        Average Company Salaries
        {avgSalaries.avgSalaries.length
          ? ` in ${avgSalaries.avgSalaries[0].currency}`
          : ` `}
      </h3>
      {!isFetching ? (
        <>
          {avgSalaries.avgSalaries &&
          avgSalaries.avgSalaries.length !== 0 &&
          avgSalaries.avg !== 0 ? (
            <>
              <ResponsiveContainer width="95%" height={400}>
                <BarChart
                  data={state}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    tick={<CustomizedAxisTick />}
                    dataKey="interest"
                    height={170}
                    angle={45}
                    interval={0}
                  >
                    <Label
                      value="Job Role"
                      position="insideBottom"
                      offset={-5}
                    />
                  </XAxis>
                  <YAxis dataKey="avg" />
                  <Tooltip />
                  <Bar dataKey="avg" barSize={100}>
                    {avgSalaries.avgSalaries &&
                      avgSalaries.avgSalaries.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLOURS[index]} />
                      ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </>
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
    </StyledDiv>
  );
};

export default connect(state => state, { getAvgSalaries })(CompanySalaryChart);

const StyledDiv = styled.div`
  width: 800px;
  height: 500px;
  h3 {
    margin-bottom: 40px;
  }
  @media ${mobilePortrait} {
    width: 99%;
  }
  .empty-state {
    max-width: 800px;
  }
`;
