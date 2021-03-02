import React from 'react';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import loadUser from '../../actions/auth';
import DashboardActions from './DashboardActions';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Experience from './Experience';
import Education from './Education';
import { CLEAR_PROFILE } from '../../actions/types';

const Dashboard = () => {
  const { profile, loading } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(async () => {
    dispatch(await getCurrentProfile());
    // dispatch(await loadUser());
  }, []);

  const { user, isAuth } = useSelector((state) => state.auth);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'> Welcome {user && user.name}</i>
      </p>
      {profile !== null ? (
        <>
          <DashboardActions></DashboardActions>
          <Experience experience={profile.experience}></Experience>
          <Education education={profile.education}></Education>
          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={async () => {
                dispatch(await deleteAccount());
                dispatch({ type: CLEAR_PROFILE });
                history.push('/');
              }}
            >
              Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet set a profile,please add some info </p>
          <Link className='btn btn-primary my-1' to='/create-profile'>
            Click to create your profile
          </Link>
        </>
      )}
    </>
  );
};

export default Dashboard;
