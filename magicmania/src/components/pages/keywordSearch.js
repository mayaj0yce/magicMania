import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_KEYWORD } from '../../graphql/queries'; // Import the query

function KeywordSearch() {
  // State to store the keyword entered by the user
  const [keyword, setKeyword] = useState("");
  const [showConfirmMessage, setshowConfirmMessage] = useState(false);
  const [keywordData, setKeywordData] = useState(null);

  // Function to handle keyword input changes
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // GraphQL query to search for a keyword
  const { loading, error, data } = useQuery(SEARCH_KEYWORD, {
    variables: { keyword },
    skip: !showConfirmMessage, // Skip the query if showConfirmMessage is false
  });

  // Function to handle keyword search
  const handleKeywordSearch = (e) => {
    e.preventDefault();
    setshowConfirmMessage(true); // Set showConfirmMessage to true on search

    // The GraphQL query will now be triggered automatically because of the skip condition.
  };

  console.log('Current Keyword:', keyword);
  console.log('Show Confirm Message:', showConfirmMessage);
  console.log('GraphQL Data:', data);

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
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {showConfirmMessage && keywordData && (
          <div>
            <h3>Keyword: {keywordData.Keyword}</h3>
            <p>Description: {keywordData.Description}</p>
            {keywordData.Example && <p>Example: {keywordData.Example}</p>}
          </div>
        )}
      </main>
    </div>
  );
}

export default KeywordSearch;
