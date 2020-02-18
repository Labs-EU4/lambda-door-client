/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import { Rate } from 'antd';
import { Link } from 'react-router-dom';

export default function TopRatedCard(props) {
  const { text, name, id, rating } = props;
  return (
    <div className="cards">
      <Link to={`company-page/${id}`} className="nav-link">
        <div>
          <h3>{name}</h3>
          <p>{text}</p>
        </div>
        <Rate disabled defaultValue={Math.floor(Number(rating))} />
      </Link>
    </div>
  );
}
