import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, clear } from '../../actions/auth';
const Navbar = () => {
  const isAuth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const authLink = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'>
            <span className='hide-sm'> Dashboard</span>
          </i>
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            dispatch(clear());
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
        <Link to='/profiles'>Developers</Link>
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
