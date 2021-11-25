import React, { useState } from 'react'

const [state, setState] = useState([]);

function card(cardData) {
    console.log(cardData);
    return <button>{cardData}</button>
}

const getDeck = async () =>{
    const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const data =  await res.json();
    let myDeck = [];
    for (let i = 0; i < 20; i++){
        const res2 = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`);
        const data2 = await res2.json();
        myDeck[i] = data2;
    }
    setState(myDeck);
}

export default function gameBoard() {
    
    return (
        <div>
            {getDeck().then((val) => val.map(data => card(data)))}
        </div>
    )
}
