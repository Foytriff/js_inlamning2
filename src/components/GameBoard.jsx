import React, { useState, useEffect } from 'react'

function card(cardData) {
    console.log(cardData);
    return <button>{cardData}</button>
}

export default function GameBoard() {

    let myDeck = [];

    const [state, setState] = useState([]);

    useEffect(async () => {
        const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        const data =  await res.json();
        
        for (let i = 0; i < 20; i++){
            const res2 = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`);
            const data2 = await res2.json();
            console.log(data2);
            myDeck[i] = data2;
        }
        setState(myDeck);
    }, [])
    
    return (
        <div>
            
        </div>
    )
}
