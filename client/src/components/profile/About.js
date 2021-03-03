import React from 'react';

const About = ({ profile }) => {
  const { bio, skills, user } = profile;
  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <>
          <h2 className='text-primary'>Bio</h2>
          <p>{bio}</p>
        </>
      )}

      <div className='line'></div>
      <h2 className='text-primary'>Skill Set</h2>
      <div className='skills'>
        {skills.map((skill, index) => {
          return (
            <div key={index} className='p-1'>
              {skill}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default About;
