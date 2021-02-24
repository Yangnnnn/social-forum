import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import setAlert, { removeAlert } from '../../actions/alert';
import { useDispatch } from 'react-redux';
import register from '../../actions/auth';
import PropTypes from 'prop-types';
import { SET_ALERT, REMOVE_ALERT } from '../../actions/types';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      const alert = setAlert('Password does not match', 'danger');
      dispatch(alert);
      setTimeout(() => {
        dispatch(removeAlert(alert.payload.id));
      }, 5000);
    } else {
      const reg = await register({ name, email, password });

      dispatch(reg);
      const errors = reg.errors;
      if (errors) {
        errors.map((error) => {
          const alert = setAlert(error.msg, 'danger');
          dispatch(alert);
          setTimeout(() => {
            dispatch(removeAlert(alert.payload.id));
          }, 5000);
        });
      }
    }
  };
  return (
    <>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => submitHandler(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => {
              changeHandler(e);
            }}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </>
  );
};

export default Register;
