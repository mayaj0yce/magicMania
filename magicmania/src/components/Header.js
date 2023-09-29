import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import LogoPic from '../assets/images/logoimg.png'
import { FaBars, FaTimes } from 'react-icons/fa'

const NavLinks = () => {
    return (
        <>
        <Link to="/" className='navLink hovernow'>Home</Link>
        <Link to="/login"className='navLink hovernow'>Login</Link>
        <Link to="/signup"className='navLink hovernow'>Signup</Link>
        {/* <Link to="/User"className='navLink hovernow'>UserPage</Link> */}
        </>
    );
};

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className='pb-2'>
            <div className='flex justify-between items-center w-full h-20 fixed flex-wrap whole-nav'>
                <div className='px-4'>
                    <Link to="/"><img src={LogoPic} alt="logo" className=' logoPic'/></Link>
                </div>
                <nav className=' flex w-1/4 justify-end px-4'>
                    <div className='hidden md:flex justify-between text-xl allNavLinks'>
                        <NavLinks />
                    </div>
                    <div className='md:hidden'>
                        <button onClick={toggleNav}>
                            {isOpen ? <FaTimes size={25}/> : <FaBars size={25}/>}
                        </button>
                    </div>
                </nav>
                {isOpen && (
                    <div className='flex flex-col flex-wrap items-center top-0 left-0 w-full py-2 rounded justify-center nav-dropdown'>
                        <NavLinks />
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;