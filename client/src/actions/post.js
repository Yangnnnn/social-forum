import axios from 'axios';
import { setAlert } from './alert';
import {
  DELETE_POST,
  POSTS_ERROR,
  POSTS_SUCCESS,
  UPDATE_LIKES,
  ADD_POST,
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
