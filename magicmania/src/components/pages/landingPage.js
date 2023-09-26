import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      {/* Header */}
      <header>
        <h1>Magic: The Gathering Website</h1>
      </header>

      {/* Body */}
      <main>
        <h2>Welcome to MagicMania</h2>
        <p>Choose an option below to start your adventure</p>

        {/* Keyword Search */}
        <Link to="/keywordSearch">
          <div className="option">
            <h3>Keyword Search</h3>
            <p>Search for keywords on Magic cards</p>
          </div>
        </Link>

        {/* Card Search */}
        <Link to="/cardSearch">
          <div className="option">
          <img src="../../assets/images/magicCardInHand.jpg" alt="Person holding back of magic card close to screen" />
            <h3>Card Search</h3>
            <p>Search for Magic cards and build your own deck!</p>
          </div>
        </Link>
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 2023 MagicMania!</p>
      </footer>
    </div>
  );
}

export default LandingPage;