import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_CARD } from '../../graphql/mutations'; // Import your SAVE_CARD mutation
import '../Header.css';
import { GiCardPick } from 'react-icons/gi';
import GetUser from '../../utils/auth.js';

function CardSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Use the useMutation hook to define the saveCard mutation
  const [saveCardMutation, { error: saveCardError }] = useMutation(SAVE_CARD);

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
        id: card.id || '',
      }));

      setSearchResults(formattedCards);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCard = async (cardId) => {
    try {
      // Call the saveCard mutation with the cardId
      const response = await saveCardMutation({
        variables: {
          input: {
            cardId,
          },
        },
        context: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('id_token')}`,
            },
        },
      });

      // Handle the success response here
      console.log('Card saved successfully:', response.data.saveCard);

      // You can perform any additional actions after successfully saving the card here

    } catch (error) {
      // Handle errors, e.g., display an error message.
      console.error('Error saving card:', error);
    }
  };

  console.log(searchResults);

  return (
    <div className="container mx-auto p-4">
      <div className="flex text-center justify-center">
        <h2 className="text-2xl font-semibold mb-4 text-center items-center">Search by Card</h2>
        <span className="card-search-icon"><GiCardPick size={25} /></span>
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Enter card name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 bg-white"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
        {/* Display an error message if the mutation encounters an error */}
{saveCardError && <p>Error saving card: {saveCardError.message}</p>}
      </div>
      <div className="mt-4 items-center card-card flex justify-center">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((card, index) => (
              <li key={index} className="flex flex-col lg:flex-row items-center shadow-lg rounded-2xl p-4">
                {card.imageUrl && (
                  <div className="lg:mr-4 card-img">
                    <img src={card.imageUrl} alt={card.name} />
                  </div>
                )}
                <div className="card-text">
                  <strong>Name:</strong><div className="ind-text">{card.name}</div>
                  <br />
                  <strong>Text:</strong><div className="ind-text">{card.text}</div>
                  <br />
                  <strong>Rarity:</strong><div className="ind-text">{card.rarity}</div>
                  <br />
                  <strong>Type:</strong><div className="ind-text">{card.type}</div>
                </div>
                <hr />
                {GetUser.loggedIn() ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold rounded focus:outline-none focus:ring-2 focus:ring-blue-400 goBtn w-fit px-6 py-3 mx-auto flex items-center cursor-pointer"
                    onClick={() => handleSaveCard(card.id)} // Pass the card ID to handleSaveCard
                  >
                    Save Card
                  </button>
                ) : <></>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default CardSearch;
