import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_KEYWORD } from '../../graphql/queries'; // Import the query

function KeywordSearch() {
  // State to store the keyword entered by the user
  const [keyword, setKeyword] = useState(""); // Initialize to an empty string
  const [showConfirmMessage, setshowConfirmMessage] = useState(false);
  const [keywordData, setKeywordData] = useState(null);

  // Function to handle keyword input changes
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // GraphQL query to search for a keyword
  const { loading, error, data } = useQuery(SEARCH_KEYWORD, {
    variables: { keyword },
    skip: !keyword, // Only send the query if keyword is not empty
  });

  // Function to handle keyword search
  const handleKeywordSearch = (e) => {
    e.preventDefault();

    if (data && data.searchKeyword) {
      setKeywordData(data.searchKeyword);
      setshowConfirmMessage(true);
    } else {
      setKeywordData(null); // Set to null when no data is available
      setshowConfirmMessage(false);
    }
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
