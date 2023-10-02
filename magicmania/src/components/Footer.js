import React from 'react'
import { Link } from 'react-router-dom';
import { AiFillGithub } from 'react-icons/ai'
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer footer-center text-base-content rounded myfooter">
      <nav className="grid grid-flow-col gap-4">
        <Link to="/" className='link link-hover'>Home</Link>
        <Link to="/login" className="link link-hover">Login</Link> 
        <Link to="/signup" className="link link-hover">Signup</Link> 
        <Link to="/keywordSearch" className="link link-hover">Keyword Search</Link>
        <Link to="/cardSearch" className="link link-hover">Card Search</Link>
      </nav> 
      <aside className='team-footer'>
        <p>Copyright © 2023 - MagicMania Team</p> 
        <a className="grid grid-flow-col gap-4" href="https://github.com/mayaj0yce/magicMania">
          <AiFillGithub size={30}/>
        </a>
      </aside>
    </footer>
  )
}

export default Footer