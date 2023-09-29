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
            <div className="mt-4">
                {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map((card, index) => (
                    <li key={index}>
                        <strong>Name:</strong> {card.name}
                        <br />
                        <strong>Text:</strong> {card.text}
                        <br />
                        <strong>Rarity:</strong> {card.rarity}
                        <br />
                        <strong>Type:</strong> {card.type}
                        <br />
                        {card.imageUrl && (
                            <img src={card.imageUrl} alt={card.name} />
                        )}
                        {/* IF LOGGED IN THEN SHOW */}
                         <button>Add To Deck</button>
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