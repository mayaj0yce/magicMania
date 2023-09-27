import React from 'react'
import { Link } from 'react-router-dom';
import { AiFillGithub } from 'react-icons/ai'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer footer-center p-6 bg-base-200 text-base-content rounded myfooter">
      <nav className="grid grid-flow-col gap-4">
        <Link to="/" className='link link-hover'>Home</Link>
        <Link to="/login" className="link link-hover">Login</Link> 
        <Link to="/signup" className="link link-hover">Signup</Link> 
        <Link to="/keyword-search" className="link link-hover">Keyword Search</Link>
        <Link to="/card-search" className="link link-hover">Card Search</Link>
      </nav> 
      <nav>
        <a className="grid grid-flow-col gap-4" href="https://github.com/mayaj0yce/magicMania">
          <AiFillGithub size={30}/>
        </a>
      </nav> 
      <aside>
        <p>Copyright © 2023 - MagicMania Team</p>
      </aside>
</footer>
  )
}

export default Footer