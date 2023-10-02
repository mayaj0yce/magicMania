import React from "react";
import { CardDisplay } from '../cardDisplay';
import Signup from "./signup";

// TODO: add the jwt token to show the add card to deck button and the 'userpage' navbar link 
// Checkout 21's project for this?
// Display the cards a user has added. 
// add cards with a mutation and then pass them through the user data and into the full deck page. full deck page needs to be linked to the user. AUTH TOKEN!!! 
// when auth token === yes then => show button { userpage, addToDeck }, hide button { Signup }


const cardDisplay = [
    {
        card: '1',
        card2: '2',
    }
]

function FullDeck() {
    return (
        <div className="fullDeck">
            <div class='block showCards'>
                <CardDisplay
                    card={cardDisplay[0].card}
                    card2={cardDisplay[0].card2}>
                </CardDisplay>
            </div>
            <button className="heartshape">add</button>
        </div>
    )
}

export default FullDeck;
