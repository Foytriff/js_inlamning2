import React, { useState, useEffect } from 'react'
import CardComp from './CardComp';
import './GameBoardcss.css'

export default function GameBoard() {
    const cardBackURL = "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2014/06/card-back-default.png";

    let cardAmount = 20;
    let myDeck = [];

    const [stateDeck, setStateDeck] = useState([]);
    const [cardCheck, setCardCheck] = useState("");
    const [pair, setPair] = useState(() => {return {card1: "", card2: ""}});

    useEffect(async () => {
        if (pair.card1 === ""){
            await setPair(prev => { return {...prev, card1: `${cardCheck}`}});
        } else if (pair.card2 === ""){
            setPair(prev => { return {...prev, card2: `${cardCheck}`}});
        }   
        console.log(cardCheck);
    }, [cardCheck])

    useEffect(() => {
        console.log(pair);
        if (pair.card1 !== '' && pair.card2 !== ''){
            checkPair();
        }
    }, [pair])

    function checkPair() {
            if (pair.card1 === pair.card2){
                setStateDeck(prev => {
                    prev.forEach(el => {
                        if (el.cards[0].image === pair.card1){
                            el.locked = true;
                        }
                    })

                    return {...prev};
                })
            } else {
                
            }
        console.log("inside checkPair")
    }

    useEffect(async () => {
        const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        const data =  await res.json();
        
        for (let i = 0; i < cardAmount; i++){
            const res2 = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`);
            const data2 = await res2.json();
            myDeck[i] = data2;
            myDeck[i].locked = false;
        }
        setStateDeck(myDeck);
    }, [])

    function see(){
        console.log(stateDeck) //Varför
        
        setStateDeck(prev => {
            let temp = prev;

            console.log(prev) //Är dessa
            
            temp[0].locked = true;

            console.log(temp); //samma???

            return temp;
        })
    }

    
    return (
        <div className="grid">
            <button onClick={see}>Check</button>
            {stateDeck && stateDeck.map((card) => {
                return (
                    <CardComp getCard={cardX => setCardCheck(cardX)} key={card.cards[0].code} imgSrc={card.cards[0].image}/>
                );
            })}
        </div>
    )
}
