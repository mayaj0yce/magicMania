import React from 'react';
import './Header.css';
import { useMutation } from '@apollo/client';
import { DELETE_USER_CARD } from '../graphql/mutations';

export const CardDisplay = ({ id, name, imageUrl, setSavedCards }) => {
  const [deleteCard] = useMutation(DELETE_USER_CARD);

  const handleDeleteCard = async () => {
    try {
      const response = await deleteCard({
        variables: { cardId: id },
      });
  
      const deletedCard = response.data.deleteUserCard;
      
      if (deletedCard) {
        // Update the local state (list of saved cards) to reflect the removal
        setSavedCards((prevSavedCards) =>
          prevSavedCards.filter((card) => card.id !== id)
        );
      } else {
        console.error('Card deletion failed. Check your server response.');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };
  

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 shadow-lg rounded card-display-test'>
      <div className=''>
        <div className=''>
          <strong>Name:</strong>
          <div className='up-card-name'>{name}</div>
        </div>
        {imageUrl && (
          <img src={imageUrl} alt={name} className='image-userpage' />
        )}
        <button
          className='bg-red-500 hover:bg-red-600 text-white text-xl font-bold rounded focus:outline-none focus:ring-2 focus:ring-red-400 deleteBtn w-fit px-6 py-3 mx-auto flex items-center cursor-pointer deleteBtn'
          onClick={handleDeleteCard}
        >
          Delete Card
        </button>
      </div>
    </div>
  );
};
