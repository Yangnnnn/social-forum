import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import setAlert, { removeAlert } from '../../actions/alert';
const CommentItem = ({ Id, comment }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className='comments'>
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${comment.user}`}>
            <img className='round-img' src={comment.avatar} alt='' />
            <h4>{comment.name}</h4>
          </Link>
        </div>
        <div>
          <p className='my-1'>{comment.text}</p>
          <p className='post-date'>
            Posted on <Moment>{comment.date}</Moment>
          </p>
          {!auth.loading && comment.user === auth.user._id && (
            <button
              onClick={async (e) => {
                dispatch(await deleteComment(Id, comment._id));
                const alert = dispatch(setAlert('Comment Removed', 'success'));
                setTimeout(() => {
                  dispatch(removeAlert(alert.payload.id));
                }, 5000);
              }}
              type='button'
              className='btn btn-danger'
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
