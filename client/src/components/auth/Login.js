import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, login } from '../../actions/auth';
import setAlert, { removeAlert } from '../../actions/alert';

const Login = ({}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const isAuth = useSelector((state) => state.auth.isAuth);
  if (isAuth) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      {/* <div className='alert alert-danger'>Invalid credentials</div> */}
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into Your Account
      </p>
      <form
        className='form'
        onSubmit={async (e) => {
          e.preventDefault();
          const log = await login(formData.email, formData.password);
          dispatch(log);

          if (log.errors) {
            log.errors.map((error) => {
              const alert = setAlert(error.msg, 'danger');
              dispatch(alert);
              setTimeout(() => {
                dispatch(removeAlert(alert.payload.id));
              }, 5000);
            });
          } else {
            dispatch(await loadUser());
          }
        }}
      >
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={formData.email}
            onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </>
  );
};

export default Login;
