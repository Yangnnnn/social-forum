import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIdProfiles } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import About from './About';
import Experience from './Experience';
import Education from './Education';
import Github from './Github';
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
      {auth.isAuth && (profile.profile === null || auth.loading) ? (
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
        <div className='profile-exp bg-white p-2'>
          <h2 className='text-primary'>Experience</h2>
          {profile.profile && profile.profile.experience.length > 0 ? (
            <>
              {profile.profile.experience.map((exp, index) => {
                {
                  return <Experience key={index} exp={exp}></Experience>;
                }
              })}
            </>
          ) : (
            <h4>No experience here</h4>
          )}
        </div>

        <div className='profile-edu bg-white p-2'>
          <h2 className='text-primary'>Education</h2>
          {profile.profile && profile.profile.education.length > 0 ? (
            <>
              {profile.profile.education.map((edu, index) => {
                {
                  return <Education key={index} edu={edu}></Education>;
                }
              })}
            </>
          ) : (
            <h4>No education here</h4>
          )}
        </div>
        {profile.profile && profile.profile.github && (
          <Github username={profile.profile.github}></Github>
        )}
      </div>
    </>
  );
};

export default Profile;
