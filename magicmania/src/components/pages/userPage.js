import React, { useEffect, useState } from "react";
import { UserInfo } from "../userInfo";
import { CardDisplay} from '../cardDisplay';
import '../Header.css'
import { Link } from 'react-router-dom';

const userInfo = [
  {
    username: 'sarahD',
    email: 'sarababuy@email.com',
  }
  //use effect run once upon page load 
  // query data base for logged in user and send that data to the props
]



function UserPage() {

  const [savedCards, setSavedCards] = useState([]);

  useEffect(() => {
    const savedCardData = JSON.parse(localStorage.getItem('savedCardData')) || [];
    setSavedCards(savedCardData);
  }, []);

  return (
      <div className="userPage">
          <main className="block userInfo">
            <h2 className="text-5xl justify-center mainTitle font-semibold">Welcome, </h2>
            <UserInfo
              username={userInfo[0].username}
              email={userInfo[0].email}>
            </UserInfo>
          </main>
          <div className='block showCards'>
            <h2 className="saved-cards-title">Saved Cards:</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 card-display">
              {savedCards.map((card, index) => (
                <CardDisplay
                  key={index}
                  id={card.id}
                  name={card.name}
                  imageUrl={card.imageUrl}
                  setSavedCards={setSavedCards}
                />
              ))}
            </ul>
          </div>
      </div>
  );
}

export default UserPage
