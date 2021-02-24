import React from 'react';
import { getCurrentProfile } from '../../actions/profile';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import loadUser from '../../actions/auth';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  const { profile, loading } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(await getCurrentProfile());
    // dispatch(await loadUser());
  }, []);

  const { user } = useSelector((state) => state.auth);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'> Welcome {user && user.name}</i>
      </p>
      {profile !== null ? (
        <>has</>
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
