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

    function addToPair(cardIDFromChild){
        if (pair){
            if(pair[0] === ""){
                setPair( prev => {
                    prev[0] = cardIDFromChild;
                    console.log("card 1 set")
                    return [...prev];
                })
                
            } else if (pair[1] === ""){
                setPair( prev => {
                    prev[1] = cardIDFromChild;
                    console.log("card 2 set")
                    return [...prev];
                })
            }
            stateDeck.forEach(card =>{
                if(card.id === cardIDFromChild){
                    card.locked = 1;
                }
            })
        }
    }

    useEffect(() => {
        console.log("useEffect pair run")
        console.log(pair);
        if(pair[0] !== "" && pair[1] !== ""){
            let imgCard1;
            let imgCard2;
            for (let i = 0; i < cardAmount; i++){
                if (stateDeck[i].id === pair[0]){
                    imgCard1 = stateDeck[i].cards[0].image;
                    break;
                }
            }

            for (let i = 0; i < cardAmount; i++){
                if (stateDeck[i].id === pair[1]){
                    imgCard2 = stateDeck[i].cards[0].image;
                    break;
                }
            }

            if (imgCard1 === imgCard2){
                console.log("going into lockPair")
                lockPair();
            } else {
                console.log("going into reset")
                setTimeout(() => {
                    reset();
                }, 2000);
            }
        }
    }, [pair])

    function reset(){
        console.log("reset active")
        stateDeck.forEach(card => {
            if(card.id === pair[0] || card.id === pair[1]){
                card.locked = 0;
            }
        })
        setPair(["", ""]);
    }

    function lockPair(){
        console.log("lockPair active")
        setStateDeck(prev =>{
            stateDeck.forEach(cardObj => {
                if (pair[0] === cardObj.id || pair[1] === cardObj.id){
                    cardObj.locked = 2;
                }
            })
            return [...prev];
        })
        setPair(["", ""]);
    }


    useEffect(async () => {
        const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        const data =  await res.json();
        for (let i = 0; i < cardAmount/2; i++){

            const res2 = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`);
            const data2 = await res2.json();
            myDeck[i] = data2;
            myDeck[i].locked = 0;
            myDeck[i].id = i;
        }

        myDeck.push(...myDeck);

        myDeck = myDeck.map((item, index) => {
            item.id = index;
            return {...item}
        })
        setStateDeck(myDeck);
    }, [])

    return (
        <div className="grid">
            <button onClick={see}>click</button> 
            {stateDeck && stateDeck.map((card, index) => {
                return (
                    <CardComp key={index} id={card.id} addToPair={cardX => addToPair(cardX)} imgSrc={card.cards[0].image} lock={card.locked} />
                );
            })}
        </div>
    )
}
