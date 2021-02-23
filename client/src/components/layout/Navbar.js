import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';
const Navbar = () => {
  const isAuth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const authLink = (
    <ul>
      <li>
        <Link
          onClick={() => {
            dispatch(logout());
          }}
          to='/'
        >
          Logout
        </Link>
      </li>
    </ul>
  );
  const guestLink = (
    <ul>
      <li>
        <Link to='#!'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      {<>{isAuth.isAuth ? authLink : guestLink}</>}
    </nav>
  );
};

export default Navbar;
