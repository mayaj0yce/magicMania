import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Header.css'


function CardSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {

    };

    return (
    <div className='w-screen h-custom container p-4'>
        <h2 className="text-2xl font-semibold mb-4">Search by Card</h2>
      <div className="flex">
            <input
            type="text"
            placeholder="Enter card name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring"
            >
            Search
            </button>
      </div>
      <div className="mt-4">
            {searchResults.length > 0 ? (
            <ul>
                {searchResults.map((card) => (
                <li key={card.id}>{card.name}</li>
                ))}
            </ul>
            ) : (
            <p>No results found.</p>
            )}
      </div>
    </div>
    )
}

export default CardSearch