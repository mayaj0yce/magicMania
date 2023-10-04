import React, { useEffect, useState } from "react";
import { UserInfo } from "../userInfo";
import { CardDisplay } from '../cardDisplay';
import '../Header.css';
import { useQuery } from "@apollo/client";
import { GET_USER_CARDS } from "../../graphql/queries";
import GetUser from '../../utils/auth';

function UserPage() {
  const [savedCards, setSavedCards] = useState([]);
  const userId = GetUser.getProfile().id;

  // Get the username from localStorage
  const username = localStorage.getItem('username') || 'Guest';

  const { loading, error, data } = useQuery(GET_USER_CARDS, {
    variables: { userId },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!loading && data) {
      const userSavedCards = data.getUserCards;
      setSavedCards(userSavedCards);
    }
  }, [loading, data]);

  return (
    <div className="userPage">
      <main className="block userInfo">
        <h2 className="text-5xl justify-center mainTitle font-semibold">
          Welcome, {username}
        </h2>
        <UserInfo />
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

export default UserPage;

