import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getAllProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
const Profiles = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const { loading, profiles } = profile;
  useEffect(async () => {
    dispatch(await getAllProfiles());
  }, []);

  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and connect with
            developers
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile}></ProfileItem>
              ))
            ) : (
              <h4>No profiles found</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Profiles;
