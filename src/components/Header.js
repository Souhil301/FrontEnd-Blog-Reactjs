import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../helpers/AuthContext';
import '../App.css';

function Header() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthState({
      isAuthenticated: false,
      username: ''
    });
    navigate('/login');
  };

  return (
    <nav className='nav'>
      <Link className='butt' to="/">Home page</Link>
      <Link className='butt' to="/createpost">Create a post</Link>
      {!authState ? (
        <>
          <Link className='butt' to="/login">Login</Link>
          <Link className='butt' to="/registration">Register</Link>
        </>
      ) : (
        <div className='leftSide'>
          <h1 className='userprof' onClick={() => navigate('/profile')}>
            {authState.username}
          </h1>
          <button className='out' onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Header;
