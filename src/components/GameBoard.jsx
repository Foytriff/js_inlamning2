import React, { useState, useEffect } from 'react'
import CardComp from './CardComp';
import './GameBoardcss.css'

export default function GameBoard() {
    let cardAmount = 20;
    let myDeck = [];

    const [state, setState] = useState([]);

    useEffect(async () => {
        const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        const data =  await res.json();
        
        for (let i = 0; i < 20; i++){
            const res2 = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`);
            const data2 = await res2.json();
            myDeck[i] = data2;
        }
        setState(myDeck);
    }, [])

    function see(){
        console.log(CardComp.)
    }

    
    return (
        <div className="grid">
            <button onClick={}>Check</button>
            {state.map((card) => {
                return (
                    <CardComp key={card.cards[0].code} val={card.cards[0].code} img={card.cards[0].image} />
                );
            })}
        </div>
    )
}
