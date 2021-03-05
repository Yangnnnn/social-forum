import axios from 'axios';
import { setAlert } from './alert';
import {
  DELETE_POST,
  POSTS_ERROR,
  POSTS_SUCCESS,
  UPDATE_LIKES,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

export const getPosts = async () => {
  try {
    const res = await axios.get('/api/posts');
    return {
      type: POSTS_SUCCESS,
      payload: res.data,
    };
  } catch (error) {
    return {
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    };
  }
};

export const addLike = async (post_id) => {
  try {
    const res = await axios.put(`/api/posts/like/${post_id}`);
    return {
      type: UPDATE_LIKES,
      payload: { post_id, likes: res.data },
    };
  } catch (error) {
    return {
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    };
  }
};

export const removeLike = async (post_id) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${post_id}`);
    return {
      type: UPDATE_LIKES,
      payload: { post_id, likes: res.data },
    };
  } catch (error) {
    return {
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    };
  }
};

export const deletePost = async (post_id) => {
  try {
    const res = await axios.delete(`/api/posts/${post_id}`);
    return {
      type: DELETE_POST,
      payload: post_id,
    };
  } catch (error) {
    return {
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    };
  }
};

export const addPost = async (formData) => {
  try {
    const res = await axios.post(`/api/posts/`, formData);
    return {
      type: ADD_POST,
      payload: res.data,
    };
  } catch (error) {
    return {
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    };
  }
};

export const getPost = async (id) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    return {
      type: GET_POST,
      payload: res.data,
    };
  } catch (error) {
    return {
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    };
  }
};

export const addComment = async (id, formData) => {
  try {
    const res = await axios.post(`/api/posts/comment/${id}`, formData);
    return {
      type: ADD_COMMENT,
      payload: res.data,
    };
  } catch (error) {
    console.log(error.response);
    return {
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    };
  }
};

export const deleteComment = async (id, commentId) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${id}/${commentId}`);

    return {
      type: REMOVE_COMMENT,
      payload: commentId,
    };
  } catch (error) {
    return {
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    };
  }
};
