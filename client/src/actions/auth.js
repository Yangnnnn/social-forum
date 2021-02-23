import axios from 'axios';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from './types';
import setToken from '../helper/setToken';

export const loadUser = async () => {
  const token = localStorage.token;

  if (token) {
    setToken(token);
  }
  try {
    const res = await axios.get('/api/auth');
    return {
      type: USER_LOADED,
      payload: res.data,
    };
  } catch (error) {
    return {
      type: AUTH_ERROR,
    };
  }
};
// register a user
export default async function ({ name, email, password }) {
  let config = {
    header: {
      'Content-type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      '/api/users ',
      {
        name,
        email,
        password,
      },
      config
    );
    return {
      type: REGISTER_SUCCESS,
      payload: res.data,
    };
  } catch (error) {
    const errors = error.response.data.errors;
    return {
      type: REGISTER_FAIL,
      errors,
    };
  }
}

export const login = async (email, password) => {
  const config = {
    header: 'application/json',
  };
  try {
    const res = await axios.post(
      '/api/auth ',
      {
        email,
        password,
      },
      config
    );
    return {
      type: LOGIN_SUCCESS,
      payload: res.data,
    };
  } catch (error) {
    const errors = error.response.data.errors;
    return {
      type: LOGIN_FAIL,
      errors,
    };
  }
};
