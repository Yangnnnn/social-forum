import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike } from '../../actions/post';
import { deletePost } from '../../actions/post';
import setAlert, { removeAlert } from '../../actions/alert';
const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const { avatar, comments, date, likes, name, text, user, _id } = post;
  const auth = useSelector((state) => state.auth);
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button
          onClick={async () => {
            dispatch(await addLike(_id));
          }}
          type='button'
          className='btn btn-light'
          disabled={!auth.isAuth || false}
        >
          <i className='fas fa-thumbs-up'></i>
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button
          onClick={async () => {
            dispatch(await removeLike(_id));
          }}
          disabled={!auth.isAuth || false}
          type='button'
          className='btn btn-light'
        >
          <i className='fas fa-thumbs-down'></i>
        </button>
        <Link to={`/post/${_id}`} className='btn btn-primary'>
          Discussion{' '}
          {comments.length > 0 && (
            <span className='comment-count'>{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={async () => {
              dispatch(await deletePost(_id));
            }}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
