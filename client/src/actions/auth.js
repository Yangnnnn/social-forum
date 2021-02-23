import axios from 'axios';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
} from './types';
import setToken from '../helper/setToken';

export const loadUser = async () => {
  const token = localStorage.token;

  if (token) {
    setToken(token);
  }
  try {
    const res = await axios.get('http://localhost:5000/api/auth');
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

export default async function ({ name, email, password }) {
  //   const dispatch = useDispatch();
  let config = {
    header: {
      'Content-type': 'application/json',
    },
  };
  try {
    const res = await axios.post('http://localhost:5000/api/users ', {
      name,
      email,
      password,
    });
    console.log(res.data);
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
