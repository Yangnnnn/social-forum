import React, { useEffect } from 'react';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { useDispatch, useSelector } from 'react-redux';
const Github = ({ username }) => {
  const dispatch = useDispatch();
  const { repos } = useSelector((state) => state.profile);
  useEffect(async () => {
    dispatch(await getGithubRepos(username));
  }, []);

  return (
    <div className='profile-github'>
      <h2 className='text-priamry my-1'>Github Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => {
          return (
            <div key={repo.id} className='repo bg-white p-1 my-1'>
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target='_blank'
                    rel='noopenner noreferrer'
                  >
                    {repo.name}
                  </a>
                </h4>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Github;
