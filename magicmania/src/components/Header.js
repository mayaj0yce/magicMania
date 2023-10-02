import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Header.css';
import LogoPic from '../assets/images/logoimg.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavLinks = () => {
    const isAuthenticated = !!localStorage.getItem('authToken'); // Check if the user is authenticated
  
    return (
      <>
        <Link to="/" className='navLink hovernow'>Home</Link>
        {/* Conditionally render "Login" and "Signup" when the user is not authenticated */}
        {!isAuthenticated && (
          <>
            <Link to="/login" className='navLink hovernow'>Login</Link>
            <Link to="/signup" className='navLink hovernow'>Signup</Link>
          </>
        )}
        {/* IF LOGGED IN THEN SHOW */}
        {isAuthenticated && <Link to="/User" className='navLink hovernow'>UserPage</Link>}
      </>
    );
  };

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Obtain the navigation function

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem('authToken');

    // Redirect the user to the login page
    navigate('/login');
  };

  console.log('Auth Token:', localStorage.getItem('authToken')); // Debugging
  console.log('Is User Authenticated:', !!localStorage.getItem('authToken')); // Debugging

  return (
    <header className='pb-2'>
      <div className='flex justify-between items-center w-full h-20 fixed flex-wrap whole-nav'>
        <div className='px-4'>
          <Link to="/"><img src={LogoPic} alt="logo" className=' logoPic' /></Link>
        </div>
        <nav className=' flex w-1/4 justify-end px-4'>
          <div className='hidden md:flex justify-between text-xl allNavLinks'>
            <NavLinks />
            {/* Render the "Logout" button when the user is logged in */}
            {localStorage.getItem('authToken') && (
              <button className='navLink hovernow' onClick={handleLogout}>Logout</button>
            )}
          </div>
          <div className='md:hidden'>
            <button onClick={toggleNav}>
              {isOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
            </button>
          </div>
        </nav>
        {isOpen && (
          <div className='flex flex-col flex-wrap items-center top-0 left-0 w-full py-2 rounded justify-center nav-dropdown'>
            <NavLinks />
            {/* Render the "Logout" button in the mobile menu when the user is logged in */}
            {localStorage.getItem('authToken') && (
              <button className='navLink hovernow' onClick={handleLogout}>Logout</button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header;
