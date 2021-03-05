import React from 'react';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react/cjs/react.development';
import PostItem from './PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
const Post = ({ match }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const auth = useSelector((state) => state.auth);
  useEffect(async () => {
    dispatch(await getPost(match.params.id));
  }, []);
  return post.loading || post === null ? (
    <Spinner></Spinner>
  ) : (
    <>
      <Link to='/posts' className='btn'>
        Back
      </Link>
      <PostItem post={post.post}></PostItem>

      {auth.isAuth ? <CommentForm postId={post.post._id}></CommentForm> : ''}
      {post.post.comments.map((comment) => {
        return (
          <CommentItem
            key={comment._id}
            comment={comment}
            Id={post.post._id}
          ></CommentItem>
        );
      })}
    </>
  );
};

export default Post;
