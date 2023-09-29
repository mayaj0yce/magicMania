import React from "react";
import { Link } from 'react-router-dom';
import { UserInfo } from "../userInfo";
import { CardDisplay } from '../cardDisplay';
import { FullDeck } from '../pages/fullDeck';

const userInfo = [
  {
    username: 'sarahD',
    email: 'sarababuy@email.com',
  }
  //use effect run once upon page load 
  // query data base for logged in user and send that data to the props
]

const cardDisplay = [
  {
    card: '1',
    card2: '2',
  }
]


const NavLinks = () => {
  return (
    <>
      <Link to='/FullDeck' className="navLink hovernow">
        FullDeck
        </Link>
    </>
  );
};



function showUser() {
  return (
    <div className="userPage">
      <main className="block userInfo">
        <h2 className="text-5xl justify-center mainTitle font-semibold">Welcome, </h2>
        <UserInfo
          username={userInfo[0].username}
          email={userInfo[0].email}>
        </UserInfo>
      </main>
      <div class='block showCards'>
        <CardDisplay
          card={cardDisplay[0].card}
          card2={cardDisplay[0].card2}>
        </CardDisplay>
        <button>view All cards in your deck </button>
        <NavLinks />
      </div>
    </div>
  )

}

export default showUser
// import { CgCardHearts } from 'react-icons/cg'
