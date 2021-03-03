import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIdProfiles } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import About from './About';
import Spinner from '../layout/Spinner';
const Profile = ({ match }) => {
  const profile = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(await getIdProfiles(match.params.id));
  }, []);
  return (
    <>
      {profile.profile === null || auth.loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <Link to='/profiles' className='btn btn-primary'>
            Back
          </Link>
        </>
      )}
      <div className='profile-grid my-1'>
        {profile.profile ? <ProfileTop profile={profile.profile} /> : <></>}
        {profile.profile ? <About profile={profile.profile} /> : <></>}
      </div>
    </>
  );
};

export default Profile;
