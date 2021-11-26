import React, { useState, useEffect } from 'react'
import CardComp from './CardComp';
import './GameBoardcss.css'

export default function GameBoard() {
    let cardAmount = 20;
    let myDeck = [];
    let pairCount = 0;
    let cardCompArr = [];

    const [stateDeck, setStateDeck] = useState([]);
    const [cardCheck, setCardCheck] = useState("");
    const [pair, setPair] = useState(() => {return {card1: "", card2: ""}});

    useEffect(async () => {
        /* if (pairCount === 2){
            checkPair();
            pairCount = 0;
            return;
        }
        pairCount++; */
        if (pair.card1 === ""){
            await setPair(prev => { return {...prev, card1: `${cardCheck}`}});
        } else if (pair.card2 === ""){
            setPair(prev => { return {...prev, card2: `${cardCheck}`}});
        }
        
        console.log(cardCheck);
    }, [cardCheck])

    useEffect(() => {
        console.log(pair);
    }, [pair])

    function checkPair() {
        if (cardCheck[0] === cardCheck[1]){
            //set cardComp to locked
        } else {
            //flip cardComps back
        }
        console.log("inside checkPair")
    }

    useEffect(async () => {
        const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        const data =  await res.json();
        
        for (let i = 0; i < 20; i++){
            const res2 = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`);
            const data2 = await res2.json();
            myDeck[i] = data2;
        }
        setStateDeck(myDeck);
    }, [])

    function see(){
        console.log(cardCompArr[0]);
    }

    
    return (
        <div className="grid">
            <button onClick={see}>Check</button>
            {stateDeck.map((card) => {
                return (
                    <CardComp getCard={cardX => setCardCheck(cardX)} key={card.cards[0].code} val={card.cards[0].code} img={card.cards[0].image} />
                );
            })}
        </div>
    )
}
