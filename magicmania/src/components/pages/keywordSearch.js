import React, { useState } from 'react';
import '../Header.css'
import { useQuery } from '@apollo/client';
import { SEARCH_KEYWORD } from '../../graphql/queries'; // Import the query

function capitalizeFirstLetter(input) {
  // Function to capitalize the first letter of a string
  return input.charAt(0).toUpperCase() + input.slice(1);
}

function KeywordSearch() {
  // State to store the keyword entered by the user
  const [keyword, setKeyword] = useState("");
  const [showConfirmMessage, setshowConfirmMessage] = useState(false);
  const [keywordData, setKeywordData] = useState(null);

  // State to track if the search is in progress
  const [searchInProgress, setSearchInProgress] = useState(false);

  // Function to handle keyword input changes
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // GraphQL query to search for a keyword
  const { loading, error } = useQuery(SEARCH_KEYWORD, {
    variables: { keyword: capitalizeFirstLetter(keyword) }, // Capitalize the keyword
    skip: !searchInProgress, // Skip the query if searchInProgress is false
    onCompleted: (data) => {
      // Update the keywordData state when the query completes
      setKeywordData(data.searchKeyword);
      // Reset searchInProgress to false after the query completes
      setSearchInProgress(false);
    },
  });

  // Function to handle keyword search
  const handleKeywordSearch = (e) => {
    e.preventDefault();
    if (!loading) {
      setshowConfirmMessage(true); 
      // Set showConfirmMessage to true on search
      setSearchInProgress(true); 
      // Set searchInProgress to true when search starts
    }
  };

  // console.log('Current Keyword:', keyword);
  // console.log('Show Confirm Message:', showConfirmMessage);
  // console.log('GraphQL Data:', keywordData);



  return (
    <div className='container mx-auto p-4'>
       <h2 className='text-2xl font-semibold mb-4 text-center text-black'> ✨Search for a keyword to understand the world of Magic!✨</h2>
      {/* Header */}
    
      {/* Search Form */}
      {/* <main className="flex"> */}
        <form onSubmit={handleKeywordSearch}>
          <div className='flex'>
            <input
              type="text"
              placeholder="Enter a keyword"
              value={keyword}
              onChange={handleKeywordChange}
              className="w-full p-2 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 bg-white"
            />
            <button type="submit"  className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring px-8 keyword-search-btn" disabled={searchInProgress}>
              {searchInProgress ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Display Search Results */}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {showConfirmMessage && keywordData && (
          <div className='flex flex-col shadow-lg rounded-2xl p-4 keyword-result'>
            <h3 className='keyword-Word'>
              <strong className='keyword-title'>🧙🏼Keyword:</strong>
              <hr/>{keywordData.Keyword}</h3>
            <p className='keyword-desc'><strong className='keyword-title'>🔮Description:</strong> {keywordData.Description}</p>
            {keywordData.Example && <p className='keyword-ex'><strong className='keyword-title'>🪄Example:</strong> {keywordData.Example}</p>}
          </div>
        )}
        {!showConfirmMessage && (
           <h3 className='text-gray-400 example-keyword'>Example: Trample, Double Strike, Vigilance, etc...</h3>
        )}
    </div>
  );
}

export default KeywordSearch;