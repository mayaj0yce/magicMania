import React, { useState } from 'react';

function KeywordSearch() {
  // State to store the keyword entered by the user
  const [keyword, setKeyword] = useState('');

  const [showConfirmMessage, setshowConfirmMessage] = useState(false);
  
  // Function to handle keyword input changes
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };
  
  // Function to handle keyword search
  const handleKeywordSearch = (e) => {
    e.preventDefault();
    // Add logic for fetching keyword data here
    console.log(`Searching for cards with keyword: ${keyword}`);
    setshowConfirmMessage(true);
  };

  return (
    <div className='w-screen h-screen'>
      {/* Header */}

      {/* Search Form */}
      <main>
        <h2>Search to understand the world of Magic!</h2>
        <form onSubmit={handleKeywordSearch}>
          <div>
            <input
              type="text"
              placeholder="Enter a keyword"
              value={keyword}
              onChange={handleKeywordChange}
            />
            <button type="submit">Search</button>
          </div>
       </form>
      

        {/* Display Search Results */}
        {/* Implement code to display search results here and delete following line */}
        {showConfirmMessage && <p>Showing results for {keyword}</p>}
      </main>
    </div>
  );
}

export default KeywordSearch;