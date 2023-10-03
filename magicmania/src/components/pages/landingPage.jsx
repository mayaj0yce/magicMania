import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import CardSearchImage from '../../assets/images/cardSearchImg.png';
import KeyWordImage from '../../assets/images/keywordSearchImg.png';
import '../Header.css'

function LandingPage() {
  return (
    <div className='landingPageAll '>
      <h2 className='mainTitle text-4xl'>Welcome to</h2>
      <span className='text-5xl justify-center mainTitle font-semibold'>
        <span className='magic-title-animation'> MagicMania</span>
      </span>
      <p className='subtitle text-2xl'>Choose an option below to start your adventure</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
        {/* Keyword Search*/}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
          <h3 className="mb-2 text-2xl font-semibold leading-tight text-gray-800">
            Keyword Search
          </h3>
          <Link to="/keywordSearch">
            <p className='text-xl'>Search for keywords on Magic cards</p>
            <img src={KeyWordImage} className='keywordImg mx-auto' alt="card w magnifyingglass"/>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold rounded focus:outline-none focus:ring-2 focus:ring-blue-400 goBtn w-fit px-6 py-3 mx-auto flex items-center cursor-pointer"
            >
              Go  
              <span className='arrow'>
                <FaArrowRight size={20} className=''/>
              </span>
            </button>
          </Link>  
        </div>

        {/* Card Search */}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
          <h3 className="mb-2 text-2xl font-semibold leading-tight text-gray-800">
            Card Search
          </h3>
          <Link to="/cardSearch">
            <p className='text-xl'>Search for Magic cards and build your own deck!</p>
            <img src={CardSearchImage} className='cardImg mx-auto' alt="cards"/>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold rounded focus:outline-none focus:ring-2 focus:ring-blue-400 goBtn w-fit px-6 py-3 mx-auto flex items-center cursor-pointer"
            >
              Go  
              <span className='arrow'>
                <FaArrowRight size={20} className=''/>
              </span>
            </button>
          </Link>  
        </div>
      </div>
    </div>
  );
}

export default LandingPage;