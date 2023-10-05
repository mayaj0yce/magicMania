import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Header.css';
import LogoPic from '../assets/images/logoimg.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { CgCardHearts } from 'react-icons/cg';
import { AiOutlineHome, AiOutlineUserAdd } from 'react-icons/ai'
import { TbLogout, TbLogin2 } from 'react-icons/tb';

const NavLinks = () => {
    const isAuthenticated = !!localStorage.getItem('authToken'); // Check if the user is authenticated
  
    return (
      <>
        <div className="flex flex-col items-center nav-btn-full">
          <Link to="/" className='navLink hovernow my-deck-btn nav-icon-btn'><AiOutlineHome size={30}/></Link>
          <Link to="/" className='home-text'>Home</Link>
        </div>
        {/* Conditionally render "Login" and "Signup" when the user is not authenticated */}
        {!isAuthenticated && (
          <>
          <div className="flex flex-col items-center nav-btn-full">
            <Link to="/login" className='navLink hovernow my-deck-btn nav-icon-btn'><TbLogin2 size={30}/></Link>
            <Link to="/login" className='my-deck-text'>Login</Link>
          </div>
          <div className="flex flex-col items-center nav-btn-full">
            <Link to="/signup" className='navLink hovernow my-deck-btn nav-icon-btn'><AiOutlineUserAdd size={30}/></Link>
            <Link to="/signup" className='my-deck-text'>Signup</Link>
          </div>
          </>
        )}
        {/* IF LOGGED IN THEN SHOW */}
        {isAuthenticated && 
        (<div className="flex flex-col items-center nav-btn-full">
          <Link to="/User" className='navLink hovernow my-deck-btn nav-icon-btn'><CgCardHearts size={30}/></Link>
          <Link to="/User" className='my-deck-text'>My Deck</Link>
        </div>)}
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

  // console.log('Auth Token:', localStorage.getItem('authToken')); // Debugging
  // console.log('Is User Authenticated:', !!localStorage.getItem('authToken')); // Debugging

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
              <div className="flex flex-col items-center nav-btn-full">
                <button className='navLink hovernow nav-icon-btn' onClick={handleLogout}><TbLogout size={30}/></button>
                <button className='logout-text' onClick={handleLogout}>Logout</button>
              </div>
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
              <div className="flex flex-col items-center nav-btn-full">
                <button className='navLink hovernow nav-icon-btn' onClick={handleLogout}><TbLogout size={30}/></button>
                <button className='logout-text' onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header;
