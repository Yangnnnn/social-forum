import React, { useState } from 'react';
import { addComment } from '../../actions/post';
import { useDispatch } from 'react-redux';
const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Please Leave a comment</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={async (e) => {
          e.preventDefault();

          dispatch(await addComment(postId, { text }));
          setText('');
        }}
      >
        <textarea
          name='comment'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default CommentForm;
