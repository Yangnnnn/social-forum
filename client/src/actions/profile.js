import axios from 'axios';
import {
  PROFILE_SUCCESS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_ACCOUNT,
} from '../actions/types';

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

export const createProfile = async (formData, history, edit = false) => {
  try {
    const res = await axios.post('api/profile', formData);
    if (!edit) {
      history.push('/dashboard');
    }
    return {
      type: PROFILE_SUCCESS,
      payload: res.data,
    };
  } catch (error) {
    return {
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
      errors: error.response.data.errors,
    };
  }
};

// add experience to the profile

export const addExperience = async (formData, history) => {
  try {
    const res = await axios.put('api/profile/experience', formData);
    history.push('/dashboard');
    return {
      type: UPDATE_PROFILE,
      payload: res.data,
    };
  } catch (error) {
    return {
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
      errors: error.response.data.errors,
    };
  }
};
//add education
export const addEducation = async (formData, history) => {
  try {
    const res = await axios.put('api/profile/education', formData);
    history.push('/dashboard');
    return {
      type: UPDATE_PROFILE,
      payload: res.data,
    };
  } catch (error) {
    return {
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
      errors: error.response.data.errors,
    };
  }
};

//Delete experience

export const deleteExperience = async (id) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    return {
      type: UPDATE_PROFILE,
      payload: res.data,
    };
  } catch (error) {
    return {
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    };
  }
};

export const deleteEducation = async (id) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    return {
      type: UPDATE_PROFILE,
      payload: res.data,
    };
  } catch (error) {
    return {
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    };
  }
};

//Delete an account
export const deleteAccount = async () => {
  try {
    const res = await axios.delete(`/api/profile`);
    return {
      type: DELETE_ACCOUNT,
      payload: res.data,
    };
  } catch (error) {
    return {
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    };
  }
};
