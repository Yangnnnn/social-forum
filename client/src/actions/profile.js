import axios from 'axios';
import { PROFILE_SUCCESS, PROFILE_ERROR } from '../actions/types';

export const getCurrentProfile = async () => {
  try {
    const res = await axios.get('/api/profile/me');

    return {
      type: PROFILE_SUCCESS,
      payload: res.data,
    };
  } catch (error) {
    return {
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.data.msg,
        status: error.response.status,
      },
    };
  }
};
