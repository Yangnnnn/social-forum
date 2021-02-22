import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS } from './types';
import { useDispatch } from 'react-redux';
import setAlert from './alert';

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
