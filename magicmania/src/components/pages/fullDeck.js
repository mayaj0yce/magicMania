import React from "react";
import { CardDisplay } from '../cardDisplay';

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
