import React from 'react';
import { Link } from 'react-router-dom';
import CardSearchImage from '../../assets/images/magicCardInHand.jpg'

function LandingPage() {
  return (
    <div className='landingPageAll pt-14'>
      <h2>Welcome to MagicMania</h2>
          <p>Choose an option below to start your adventure</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h5 className="mb-2 text-xl font-medium leading-tight text-gray-800">
            Card 1 Title
          </h5>
          <p className="mb-4 text-base text-gray-600">
            This is the content of Card 1. You can add more details here.
          </p>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Button 1
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h5 className="mb-2 text-xl font-medium leading-tight text-gray-800">
            Card 2 Title
          </h5>
          <p className="mb-4 text-base text-gray-600">
            This is the content of Card 2. You can add more details here.
          </p>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Button 2
          </button>
        </div>
      </div>
        <div>
        {/* Body */}
        {/* <main >
          <h2>Welcome to MagicMania</h2>
          <p>Choose an option below to start your adventure</p>

          <div className='container mx-auto p-4'>
          
            <div className="option bg-themegrey p-4 rounded shadow mb-4">
               <Link to="/keyword-search">
                <h3>Keyword Search</h3>
                <p>Search for keywords on Magic cards</p>
              </Link>
            </div>

            <div className='mb-4'></div>

            <div className="bg-themegrey p-4 rounded shadow">
              <Link to="/card-search">
                <img src={CardSearchImage} alt="Person holding back of magic card close to screen" />
                  <h3>Card Search</h3>
                  <p>Search for Magic cards and build your own deck!</p>
              </Link>
            </div>
          </div>
        </main> */}
      </div>
    </div>
  );
}

export default LandingPage;