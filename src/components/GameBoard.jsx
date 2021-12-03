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
                setStateDeck(prev =>{
                    stateDeck.forEach(cardObj => {
                        if (pair[0] === cardIDFromChild){
                            cardObj.locked = 1;
                        }
                    })
                    return [...prev];
                })
            } else if (pair[1] === ""){
                setPair( prev => {
                    prev[1] = cardIDFromChild;
                    console.log("card 2 set")
                    return [...prev];
                })
                setStateDeck(prev =>{
                    stateDeck.forEach(cardObj => {
                        if (pair[0] === cardIDFromChild){
                            cardObj.locked = 1;
                        }
                    })
                    return [...prev];
                })
            }
        }
        console.log({pair});
    }

    function cardGetID(cardID){
        
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
        setPair(["", ""]);
    }

    function lockPair(){
        console.log("lockPair active")
        setStateDeck(prev =>{
            stateDeck.forEach(cardObj => {
                if (pair[0] === cardObj.cards[0].image){
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
        for (let i = 0; i < cardAmount; i += 2){

            const res2 = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`);
            const data2 = await res2.json();
            for (let j = i; j < (i + 2); j++){
                myDeck.push(data2);
            }
        }

        myDeck.forEach((item, index) => {
            item.id = index;
            console.log(item);
        })

        console.log(myDeck);

        setStateDeck(myDeck);
        setStateDeck(prev => {
            for (let i = 0; i < stateDeck.length; i += 2){
                prev[i].id -= 1;
            }
            return [...prev];
        });
    }, [])

    return (
        <div className="grid">
            <button onClick={see}>click</button>
            {stateDeck && stateDeck.map((card, index) => {
                console.log("run")
                return (
                    <CardComp key={index} id={index} addToPair={cardX => addToPair(cardX)} imgSrc={card.cards[0].image} lock={card.locked} />
                );
            })}
        </div>
    )
}
