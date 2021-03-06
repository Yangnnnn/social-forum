import React, { useEffect } from 'react';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
const Posts = () => {
  const auth = useSelector((state) => state.auth);
  const { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(await getPosts());
  }, []);
  return loading ? (
    <Spinner></Spinner>
  ) : (
    <>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'>Weclome to the Forum</i>
      </p>
      {auth.isAuth ? <PostForm /> : ''}
      <div className='posts'>
        {posts.map((post) => {
          return <PostItem key={post._id} post={post}></PostItem>;
        })}
      </div>
    </>
  );
};

export default Posts;
