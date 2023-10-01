import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Header.css'


function CardSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`https://api.magicthegathering.io/v1/cards?name=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const cards = data.cards || [];

            const formattedCards = cards.map((card) => ({
                name: card.name,
                text: card.text || 'No text available',
                rarity: card.rarity || 'Unknown',
                type: card.type || 'Unknown',
                imageUrl: card.imageUrl || '', 
            }));

            setSearchResults(formattedCards);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false)
        }
    };

    console.log(searchResults)

    return (
        <div className="container mx-auto p-4">
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
                disabled={isLoading}
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </div>
            <div className="mt-4 items-center card-card flex justify-center">
                {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map((card, index) => (
                   <li key={index} className='flex flex-col lg:flex-row items-center shadow-lg rounded-2xl p-4'>
                        {card.imageUrl && (
                            <div className='lg:mr-4 card-img'>
                                <img src={card.imageUrl} alt={card.name} />
                            </div>
                        )}
                        <div className='card-text '>
                            <strong>Name:</strong><div className='ind-text'>{card.name}</div>
                            <br />
                            <strong>Text:</strong><div className='ind-text'>{card.text}</div>
                            <br />
                            <strong>Rarity:</strong><div className='ind-text'>{card.rarity}</div>
                            <br />
                            <strong>Type:</strong><div className='ind-text'>{card.type}</div>
                        </div>
                        <hr />
                    </li>
                    ))}
                </ul>
                ) : (
                <p>No results found.</p>
                )}
            </div>
        </div>
    )
}

export default CardSearch;