import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import LogoPic from '../assets/images/logoimg.png'
import { FaBars } from 'react-icons/fa'

const Header = () => {
    const [showNav, setShowNav] = useState(false);
    const location = useLocation();

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <header>
            <div className='flex justify-between items-center w-full h-20 fixed px-4 fullNav'>
                <div>
                    <img src={LogoPic} alt="logo" className='logoPic'/>
                </div>
                <button onClick={toggleNav} className={`toggle-button ${showNav ? 'active' : ''}`}>
                    <FaBars size={25}/>
                </button>
                <nav className={`nav-links ${showNav ? 'active' : ''}`}>
                    <ul>
                        <li>
                            <Link
                            to="/"
                            onClick={toggleNav}
                            className={location.pathname === '/' ? 'active' : ''}
                            >
                                
                            </Link>
                        </li>
                        <li>
                            <Link
                            to="/login">
                                Login
                            </Link>
                        </li>
                    </ul>
                    
                </nav>
            </div>
        </header>
    )
}

export default Header;