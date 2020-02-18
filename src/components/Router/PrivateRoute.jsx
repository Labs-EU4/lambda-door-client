/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={
        matchProps =>
          localStorage.getItem('token') ? (
            <Component {...matchProps} />
          ) : (
            <Redirect to="/" />
          )
        // eslint-disable-next-line react/jsx-curly-newline
      }
    />
  );
};

export default connect(state => state)(PrivateRoute);
