import React, { useState, useEffect } from 'react'
import CardComp from './CardComp';
import './GameBoardcss.css'

export default function GameBoard() {
    const cardBackURL = "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2014/06/card-back-default.png";

    let cardAmount = 20;
    let myDeck = [];

    const [stateDeck, setStateDeck] = useState([]);
    const [pair, setPair] = useState(["", ""]);


    function see(){
        console.log(stateDeck);
        console.log(...pair);
        console.log(pair)
    }

    function addToPair(cardFromChild){
        if (pair){
            if(pair[0] === ""){
                setPair( prev => {
                    prev[0] = cardFromChild;
                    console.log("card 1 set")
                    return prev;
                })
            } else if (pair[1] === ""){
                setPair( prev => {
                    prev[1] = cardFromChild;
                    console.log("card 2 set")
                    return prev;
                })
            }
        }
        console.log({pair});
    }

    useEffect(() => {
        console.log("useEffect pair run")
        if(pair[0] !== "" && pair[1] !== ""){
            if (pair[0] === pair[1]){
                console.log("going into lockPair")
                lockPair();
            } else {
                console.log("going into reset")
                reset();
            }
        }
    }, [pair])

    function reset(){
        console.log("reset active")
        setStateDeck(stateDeck);
    }

    function lockPair(){
        console.log("lockPair active")
        setStateDeck(prev =>{
            stateDeck.forEach(cardObj => {
                if (pair[0] === cardObj.cards[0].image){
                    cardObj.locked = true;
                }
            })
            return prev;
        })
    }


    useEffect(async () => {
        const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        const data =  await res.json();
        for (let i = 0; i < cardAmount; i++){
            const res2 = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`);
            const data2 = await res2.json();
            myDeck[i] = data2;
            myDeck[i].locked = false;
            i++;
            myDeck[i] = data2;
            myDeck[i].locked = false;
        }
        setStateDeck(myDeck);
    }, [])

    return (
        <div className="grid">
            <button onClick={see}>click</button>
            {stateDeck && stateDeck.map((card, index) => {
                console.log("run")
                return (
                    <CardComp key={index} addToPair={cardX => addToPair(cardX)} imgSrc={card.cards[0].image} lock={card.locked} />
                );
            })}
        </div>
    )
}
