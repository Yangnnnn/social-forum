import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import Spinner from '../layout/Spinner';
const PrivateRoute = (props) => {
  const state = useSelector((state) => state.auth);

  if (!state.loading && !state.isAuth) {
    return <Redirect to='/login' />;
  } else if (!state.loading && state.isAuth) {
    return <Route exact path={props.path} component={props.component}></Route>;
  }
  if (state.loading) {
    return <Spinner></Spinner>;
  }
};

export default PrivateRoute;
