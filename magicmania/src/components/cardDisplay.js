 // this is for the card display on user page
import React from 'react';
import './Header.css'

export const CardDisplay = (props) => {
    // handles the delete card button on userpage
    const handleDeleteCard = () => {
        const savedCardData = JSON.parse(localStorage.getItem('savedCardData')) || [];
        const updatedSavedCardData = savedCardData.filter(card => card.id !== props.id);
        localStorage.setItem('savedCardData', JSON.stringify(updatedSavedCardData));
        // this updates the ui so it doesn't show the card on screen onces it's removed from localstorage
        props.setSavedCards(updatedSavedCardData);
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 shadow-lg rounded card-display-test'>
            <div className=''>
                <div className=''>
                    <strong>Name:</strong>
                    <div className=''>{props.name}</div>
                </div>
                {props.imageUrl && (
                    <img src={props.imageUrl} alt={props.name} className='image-userpage'/>
                )}
                <button
                    className='bg-red-500 hover:bg-red-600 text-white text-xl font-bold rounded focus:outline-none focus:ring-2 focus:ring-red-400 deleteBtn w-fit px-6 py-3 mx-auto flex items-center cursor-pointer deleteBtn'
                    onClick={() => handleDeleteCard(props.id)}
                >
                    Delete Card
                </button>
            </div>
        </div>
    )
}