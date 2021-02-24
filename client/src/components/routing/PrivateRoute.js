import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
const PrivateRoute = (props) => {
  const state = useSelector((state) => state.auth);
  if (state.isAuth) {
    return <Route exact path={props.path} component={props.component}></Route>;
  } else {
    return <Redirect to='/login' />;
  }
};

export default PrivateRoute;
