import React from 'react';
import { Link } from 'react-router-dom';
import CardSearchImage from '../../assets/images/magicCardInHand.jpg'

function LandingPage() {
  return (
    <div className='landingPageAll'>
        <div>
        {/* Body */}
        <main >
          <h2>Welcome to MagicMania</h2>
          <p>Choose an option below to start your adventure</p>

          <div className='container mx-auto p-4'>
            {/* Keyword Search */}
            <div className="option bg-themegrey p-4 rounded shadow mb-4">
               <Link to="/keyword-search">
                <h3>Keyword Search</h3>
                <p>Search for keywords on Magic cards</p>
              </Link>
            </div>

            <div className='mb-4'></div>

            {/* Card Search */}
            <div className="bg-themegrey p-4 rounded shadow">
              <Link to="/card-search">
                <img src={CardSearchImage} alt="Person holding back of magic card close to screen" />
                  <h3>Card Search</h3>
                  <p>Search for Magic cards and build your own deck!</p>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LandingPage;